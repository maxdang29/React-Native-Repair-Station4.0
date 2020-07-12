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
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.getMyAccount();
    await this.props.getMyStation();
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
    const {allStation} = this.props;
    if (allStation.length) {
      let firstStationId = allStation[0].id;
      await AsyncStorage.setItem('stationId', firstStationId);
      await this.props.getStationById(firstStationId);
      setTimeout(()=>{
        startApp();
      }, 700);
    }
  }

  // NOTIFICATION SETUP
  onRegister = token => {
    // this.props.onChangeDeviceToken(token);
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
    const notifyId = data?.id;
    if (notifyId) {
      console.log('SplashScreen -> onOpenNotification -> notifyId', notifyId);
      // SHOW POP-UP HERE
     // this.props.onFetchOrders();
      // this.props.onFetchNotifications();
      const stationId = await AsyncStorage.getItem('stationId');
      this.props.getAllOrder(stationId);

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
    getAllOrder: stationId => {
      dispatch(orderAction.getAllOrder(stationId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
