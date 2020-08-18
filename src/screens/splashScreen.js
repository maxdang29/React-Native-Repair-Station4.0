import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as authenticationAction from '../redux/authentication/actions/actions';
import * as stationAction from '../redux/station/actions/actions';
import {AsyncStorage} from 'react-native';
import startApp from '../navigation/bottomTab';
import {fcmService} from '../config/notification/FCMService';
import {localNotificationService} from '../config/notification/LocalNotificationService';
import * as orderAction from '../redux/order/actions/actions';
import * as notificationAction from '../redux/notification/actions/actions';
import {setRoot} from '../navigation/function';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  async componentDidMount() {
    const currentTime = new Date();
    const dateFrom = `${ currentTime.getFullYear()}-${ currentTime.getMonth()+1}-01`;
    const dateTo = `${ currentTime.getFullYear()}-${ currentTime.getMonth()+2}-01`;
    const {notificationPageIndex} = this.props;
    await this.props.getMyAccount();
    await this.props.getMyStation();
    await this.props.getNotifications(notificationPageIndex);
    // Register FCM Service
    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
    // Configure notification options
    localNotificationService.configure(this.onOpenNotification);
  }

  async componentDidUpdate() {
    const {allStation, stationInformation} = this.props;
    if (allStation.length) {
      const currentTime = new Date();
      const dateFrom = `${ currentTime.getFullYear()}-${ currentTime.getMonth()+1}-01`;
      const dateTo = `${ currentTime.getFullYear()}-${ currentTime.getMonth()+2}-01`;
      let firstStationId = allStation[0].id;
      await AsyncStorage.setItem('stationId', firstStationId);
      await this.props.getStationById(firstStationId);

      this.props.getAllOrder(firstStationId, 1, dateFrom, dateTo);
      this.props.getOrdersCurrentMonth(firstStationId, 1, dateFrom, dateTo);

      const yearFrom = `${ currentTime.getFullYear()}-1`;
      const yearTo = `${ currentTime.getFullYear()}-12`;
      this.props.getAllOrderRevenue(firstStationId, 1, yearFrom, yearTo);
    }
    if (stationInformation) {
      startApp();
    }
  }

  // NOTIFICATION SETUP
  onRegister = token => {
    this.props.updateTokenDevice({deviceToken: token});
  };

  onNotification = notify => {
    const options = {
      playSound: false,
    };
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  };

  onOpenNotification = async data => {
    const currentTime = new Date();
    const dateFrom = `${ currentTime.getFullYear()}-${ currentTime.getMonth()+1}-01`;
    const dateTo = `${ currentTime.getFullYear()}-${ currentTime.getMonth()+2}-01`;

    const notifyId = data?.id;
    
    if (notifyId) {
      console.log('SplashScreen -> onOpenNotification -> notifyId', notifyId);
      const stationId = await AsyncStorage.getItem('stationId');
      this.props.getAllOrder(stationId, 1, dateFrom, dateTo);
      this.props.getOrdersCurrentMonth(stationId, 1, dateFrom, dateTo);
      this.props.getNotifications();
    }
  };
  // END NOTIFICATION SETUP
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
const mapStateToProps = store => {
  return {
    allStation: store.StationReducers.allStation,
    dataOrders: store.OrderReducers.dataOrder,
    stationInformation: store.StationReducers.station,
    notificationPageIndex: store.NotificationReducers.pageIndex,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMyAccount: () => {
      dispatch(authenticationAction.getMyAccount());
    },
    getMyStation: () => {
      dispatch(stationAction.getMyStation());
    },
    getStationById: id => {
      dispatch(stationAction.getStationById(id));
    },
    getAllOrder: (stationId, pageIndex, dateFrom, dateTo) => {
      dispatch(orderAction.getAllOrder(stationId, pageIndex, dateFrom, dateTo));
    },
    updateTokenDevice: tokenDevice => {
      dispatch(authenticationAction.updateMyAccount(tokenDevice));
    },
    getNotifications: pageIndex => {
      dispatch(notificationAction.getAllNotification(pageIndex));
    },
    getAllOrderRevenue: (stationId, pageIndex, dateFrom, dateTo) => {
      dispatch(orderAction.getAllOrderRevenue(stationId, pageIndex, dateFrom, dateTo));
    },
    getOrdersCurrentMonth: (stationId, pageIndex, dateFrom, dateTo) => {
      dispatch(orderAction.getOrdersCurrentMonth(stationId, pageIndex, dateFrom, dateTo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
