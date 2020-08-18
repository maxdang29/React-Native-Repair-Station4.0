import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  SectionList,
  Modal
} from 'react-native';
import OrderItem from '../../components/order/orderItem';
import {connect} from 'react-redux';
import * as orderAction from '../../redux/order/actions/actions';
import {showNotification, showModalNavigation} from '../../navigation/function';
import {AsyncStorage} from 'react-native';
import {Icon, Header, ListItem, Card} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import {
  WAITING,
  ACCEPTED,
  CANCELED,
  REJECTED,
  DONE,
} from '../../constants/orderStatus';
import {format} from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';
import MonthSelectorCalendar from 'react-native-month-selector';
import {APP_COLOR} from '../../utils/colors';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

import Moment from "moment";
require("moment/locale/vi");
Moment.locale("vi");

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'accepted', title: 'Đã chấp nhận'},
        {key: 'done', title: 'Hoàn thành'},
        {key: 'cancel', title: 'Đã hủy'},
      ],
      isFetching: false,
      month: Moment(),
      modalVisible: false
    };
  }

  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const {index} = this.state;
    return (
      <View style={styles.tabContainer}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={[
                styles.buttonTab,
                index === i ? styles.buttonActive : null,
              ]}
              onPress={() => this.setState({index: i})}>
              <Text
                style={[
                  styles.textButton,
                  index === i ? styles.textActive : null,
                ]}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  convertDataToSection = orders => {
    let dates = [];
    let objOrder = {};
    orders.map(order => {
      let date = format(new Date(order.createdOn), 'dd-MM-yyyy');
      if (!dates.includes(date)) {
        dates.push(date);
        objOrder[date] = {title: date, key: date, data: [order]};
      } else {
        objOrder[date].data.push(order);
      }
    });
    let result = Object.keys(objOrder).map(key => objOrder[key]);
    return result;
  };

  renderOrder = status => {
    const {dataOrders} = this.props;
    console.log("dataOrders", dataOrders)

    let resultData = dataOrders.filter(order => {
      if (status === CANCELED) {
        return order.status === status || order.status === REJECTED;
      }
      return order.status === status;
    });
    const DATA = this.convertDataToSection(resultData);
    if (DATA.length > 0)
      return (
        <View style={styles.container}>
          <SectionList
            style={{height: '89%'}}
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => <OrderItem item={item} />}
            renderSectionHeader={({section: {title}}) => (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginHorizontal: 5,
                  marginTop: 10,
                }}>
                Ngày: {title}
              </Text>
            )}
          />
        </View>
      );
    else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 16}}>Không có đơn hàng nào</Text>
        </View>
      );
    }
  };

  _renderScene = SceneMap({
    accepted: () => {
      return this.renderOrder(ACCEPTED);
    },
    done: () => {
      return this.renderOrder(DONE);
    },
    cancel: () => {
      return this.renderOrder(CANCELED);
    },
  });

 onchangeMonth = (date) =>{
  this.setState({ month: date })
 }
 getOrders = async () =>{
   const {modalVisible, month} = this.state;
   let monthSelected = month.format('MMM');
   let year = month.format('YYYY');
   let dateFrom = `${year}-${parseInt(monthSelected)}-01`;
   let dateTo = `${year}-${parseInt(monthSelected)+1}-01`;
   const stationId = await AsyncStorage.getItem('stationId');
   this.props.getAllOrder(stationId, 1, dateFrom, dateTo);
   this.setState({modalVisible: !modalVisible});
 }
 setModalVisible(visible) {
  this.setState({modalVisible: visible});
}
  render() {
    const {dataOrders, loading} = this.props;
    const {month} = this.state;
    if (loading) {
      return (
        <LinearGradient
          colors={['#c2d7ff', '#cde7f9', '#ffffff']}
          style={styles.loading}>
          <ActivityIndicator size="large" />
        </LinearGradient>
      );
    } else
      return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: SCREEN_WIDTH - 70,
                  paddingTop: 10,
                }}>
                <View>
                  <MonthSelectorCalendar
                    selectedDate={month}
                    localeLanguage="vi"
                    nextText=""
                    prevText=""
                    yearTextStyle={{fontWeight: "bold", fontSize: 20}}
                    onMonthTapped={(date)=> this.onchangeMonth(date)}
                    monthTextStyle={{fontWeight: "bold"}}
                  />
                </View>
                <View
                  style={[
                    {justifyContent: 'flex-end', marginRight: 10, flexDirection: "row"},
                  ]}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }>
                    <Text>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, {backgroundColor: APP_COLOR}]}
                    onPress={() => this.getOrders()}>
                    <Text style={{color: 'white'}}>Hoàn tất</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          
          <View style={{backgroundColor: '#c2d7ff', flexDirection: "row", justifyContent: "space-between", alignContent: 'space-between'}}>
            <Text style={styles.title}>Danh sách đơn hàng</Text>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              style={{background:'red',justifyContent: "center", marginRight: 10}}>
              <Icon type="feather" name="calendar" size={30} />
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={['#c2d7ff', '#cde7f9', '#ffffff']}
            style={{backgroundColor: 'red', height: '100%'}}>
            <TabView
              style={{flex: 3}}
              navigationState={this.state}
              renderScene={this._renderScene}
              renderTabBar={this._renderTabBar}
              onIndexChange={this._handleIndexChange}
              swipeEnabled={true}
            />
          </LinearGradient>
        </>
      );
  }
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 15,
    marginVertical: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    borderBottomColor: '#e4e9ee',
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  buttonTab: {
    padding: 10,
    width: '30%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonActive: {
    backgroundColor: 'red',
  },
  textActive: {
    color: 'white',
  },
  textButton: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a4c49',
    opacity: 0.9,
  },
  textModal: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 10,
  }
});
const mapStateToProps = store => {
  return {
    dataOrders: store.OrderReducers.dataOrder,
    loading: store.OrderReducers.loading,
    pageIndex: store.OrderReducers.pageIndex,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllOrder: (stationId, pageIndex, dateFrom, dateTo) => {
      dispatch(orderAction.getAllOrder(stationId, pageIndex, dateFrom, dateTo));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
