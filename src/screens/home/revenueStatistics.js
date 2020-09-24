import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import * as orderAction from '../../redux/order/actions/actions';
import {AsyncStorage} from 'react-native';
import {APP_COLOR} from '../../utils/colors';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import {ACCEPTED, DONE} from '../../constants/orderStatus';
import {format} from 'date-fns';
import {Navigation} from 'react-native-navigation';

class RevenueStatistics extends Component {
  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({buttonId}) {
    const {componentId} = this.props;
    if (buttonId === 'back') {
      Navigation.dismissModal(componentId);
    }
  }
  filterStatusOrder = status => {
    const {orderRevenue} = this.props;
    let result = orderRevenue.filter(order => {
      return order.status === status;
    });
    return result;
  };
  sortByDate = data => {
    data.sort(function(a, b) {
      let date1 = new Date(a.createdOn);
      let date2 = new Date(b.createdOn);
      return date1 - date2;
    });
  };
  filterRevenue = () => {
    let doneOrder = this.filterStatusOrder(DONE);
    if (doneOrder.length <= 0) {
      return null;
    }
    this.sortByDate(doneOrder);

    let labels = [];
    let values = [];
    const currentTime = new Date();
    let minMonth = parseInt(format(new Date(doneOrder[0].createdOn), 'MM'));
    for (let index = 1; index < 13; index++) {
      index >= minMonth ? labels.push(index) : null;
    }

    doneOrder.forEach(order => {
      let month = format(new Date(order.createdOn), 'MM');
      let index = labels.findIndex(label => label === parseInt(month));
      if (index !== -1) {
        if (values[index] === undefined) {
          values[index] = 0;
        }
        values[index] += order.totalPrice;
      }
    });

    for (let index = 0; index < labels.length; index++) {
      values[index] = values[index] === undefined ? 0 : values[index];
      values[index] = `${values[index]}`;
      labels[index] += `/${currentTime.getFullYear()}`;
    }
    return {labels: labels, values: values};
  };
  showDataPointChart = (value, labels) => {
    Alert.alert(
      'Doanh thu',
      `Tổng doanh thu trong tháng ${
        labels[value.index]
      }: ${value.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
        ' vnd'}`,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  getRevenueCurrentMonth = dataChart => {
    const currentTime = new Date();
    let currentMonth = `${currentTime.getMonth() +
      1}/${currentTime.getFullYear()}`;
    const index = dataChart.labels.findIndex(label => label === currentMonth);
    return {
      month: currentTime.getMonth() + 1,
      revenue: dataChart.values[index],
    };
  };

  render() {
    const {orderRevenue, value} = this.props;
    const dataChart = this.filterRevenue();
    const currentMonthRevenue = this.getRevenueCurrentMonth(dataChart);
    if (dataChart) {
      return (
        <View>
          <LinearGradient
            colors={['#c2d7ff', '#cde7f9', '#ffffff']}
            style={{
              backgroundColor: APP_COLOR,
              paddingVertical: 15,
              paddingHorizontal: 15,
              height: SCREEN_HEIGHT,
            }}>
            <LineChart
              data={{
                labels: dataChart.labels,
                datasets: [
                  {
                    data: dataChart.values,
                  },
                ],
              }}
              width={SCREEN_WIDTH - 30}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 110, 199, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(56, 75, 196, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '3',
                  strokeWidth: '',
                },
                propsForBackgroundLines: {
                  strokeWidth: 0.6,
                },
              }}
              bezier
              style={{
                marginVertical: 15,
                borderRadius: 16,
              }}
              onDataPointClick={value => {
                this.showDataPointChart(value, dataChart.labels);
              }}
            />
            <View
              style={{
                backgroundColor: 'white',
                height: SCREEN_HEIGHT - 250,
                marginTop: 50,
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              <Text style={styles.title}>Thống kê</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  marginVertical: 15,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../assets/image/get-revenue.png')}
                    style={{width: 40, height: 40}}
                  />
                  <View style={{marginLeft: 20}}>
                    <Text style={{fontWeight: 'bold'}}>
                      Doanh thu tháng {currentMonthRevenue.month}
                    </Text>
                    <Text>+{value} đơn hàng</Text>
                  </View>
                </View>
                <Text style={{color: '#6d49ff', fontWeight: 'bold'}}>
                  {currentMonthRevenue.revenue
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  vnd
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  marginVertical: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/image/payroll.png')}
                    style={{width: 40, height: 40}}
                  />
                  <View
                    style={{
                      marginLeft: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>
                      Số tiền phải trả cho app
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                    }}>
                    {currentMonthRevenue.revenue - 2000000 > 0
                      ? ((currentMonthRevenue.revenue - 2000000) * 0.1)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      : 0}{' '}
                    vnd
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      );
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 16}}>Không có đơn hàng nào thành công</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    opacity: 0.9,
  },
  nameRepair: {
    flex: 1,
    fontSize: 25,
    textAlign: 'left',
    padding: 20,
    color: 'white',
  },
  textAlign: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
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
  },
  title: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 25,
    fontWeight: 'bold',
    borderBottomColor: '#c2d7ff',
    borderBottomWidth: 0.5,
    paddingBottom: 7,
  },
});
const mapStateToProps = store => {
  return {
    orderRevenue: store.OrderReducers.orderRevenue,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(RevenueStatistics);
