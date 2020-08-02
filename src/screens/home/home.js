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
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Navigation} from 'react-native-navigation';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import * as stationAction from '../../redux/station/actions/actions';
import {AsyncStorage} from 'react-native';
import {APP_COLOR} from '../../utils/colors';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import {ACCEPTED, DONE} from '../../constants/orderStatus';
import {showModalNavigation} from '../../navigation/function';
import {format} from 'date-fns';
import {el} from 'date-fns/locale';
class HomeFixer extends Component {
  constructor(props) {
    super(props);
  }
  changeToggleSwitch = async isOn => {
    await this.props.changePower(this.props.stationInformation.id, isOn);
  };
  async componentDidUpdate() {
    const {isChangePower} = this.props;
    if (isChangePower) {
      const stationId = await AsyncStorage.getItem('stationId');
      this.props.getStationById(stationId);
    }
  }

  openSideBar = () => {
    Navigation.mergeOptions('sideBar', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  filterStatusOrder = status => {
    const {dataOrders} = this.props;
    let result = dataOrders.filter(order => {
      return order.status === status;
    });
    return result;
  };

  revenueOnMonth = () => {
    const {dataOrders} = this.props;
    let revenue = 0;
    let orderDone = dataOrders.filter(order => {
      return order.status === DONE;
    });
    orderDone.forEach(order => {
      revenue += order.totalPrice;
    });
    return revenue;
  };

  getSevenOrderLast = () => {
    const doneOrder = this.filterStatusOrder(DONE);
    let values = [];
    let currentDate = new Date();
    let labels = [format(new Date(currentDate), 'dd-MM')];
    let countDate = 0;
    while (countDate < 6) {
      let newDate = currentDate.setDate(currentDate.getDate() - 1);
      newDate = format(new Date(newDate), 'dd-MM');
      labels.push(newDate);
      countDate++;
    }

    doneOrder.forEach(order => {
      let date = format(new Date(order.createdOn), 'dd-MM');
      let totalPrice = order.totalPrice;

      let index = labels.findIndex(label => {
        return label === date;
      });
      if (index !== -1) {
        values[index] = totalPrice;
      }
    });
    for (let index = 0; index < values.length; index++) {
      const element = values[index];
      if (element === undefined) {
        values[index] = 0;
      }
    }
    return {labels: labels.reverse(), values: values.reverse()};
  };

  showDataPointChart = (value, labels) => {
    Alert.alert(
      'Doanh thu',
      `Tổng doanh thu trong ngày ${
        labels[value.index]
      }: ${value.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
        ' vnd'}`,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };
  gotoOrderTab = () => {
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex: 1,
      },
    });
  };

  render() {
    const {stationInformation, isChangePower, dataOrders} = this.props;
    const totalAcceptedOrder = this.filterStatusOrder(ACCEPTED).length;
    const totalOrder = dataOrders.length;
    const rateSuccess =
      totalOrder !== 0
        ? (this.filterStatusOrder(DONE).length / totalOrder) * 100
        : 0;
    const revenueMonth = this.revenueOnMonth();
    const chartData = this.getSevenOrderLast();
    const labels = chartData.labels;
    const value = chartData.values;
    const today = new Date();
    const date = today.getDate() + '/' + today.getMonth();
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#c2d7ff', '#cde7f9', '#ffffff']}
          style={{
            backgroundColor: APP_COLOR,
            paddingVertical: 15,
            paddingHorizontal: 15,
            height: SCREEN_HEIGHT,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                this.openSideBar();
              }}>
              <Icon type="feather" name="align-left" size={30} />
            </TouchableOpacity>
            {isChangePower ? (
              <ActivityIndicator size="small" />
            ) : (
              <ToggleSwitch
                isOn={stationInformation.isAvailable}
                onColor="#4dc2ff"
                offColor="red"
                size="medium"
                onToggle={isOn => this.changeToggleSwitch(isOn)}
              />
            )}
          </View>

          <LineChart
            data={{
              labels: labels.length > 0 ? labels : [date],
              datasets: [
                {
                  data: value.length > 0 ? value : [0],
                },
              ],
            }}
            width={SCREEN_WIDTH - 30}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#c2d7ff',
              backgroundGradientTo: '#cde7f9',
              backgroundGradientFromOpacity: 1,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(54, 72, 100, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(56, 75, 196, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '3',
                strokeWidth: '2',
              },
              propsForBackgroundLines: {
                strokeDasharray: 1,
              },
            }}
            bezier
            style={{
              marginVertical: 15,
              borderRadius: 16,
            }}
            onDataPointClick={value => {
              this.showDataPointChart(value, labels);
            }}
          />
          {totalAcceptedOrder > 0 ? (
            <TouchableOpacity
              style={{
                width: SCREEN_WIDTH - 30,
                padding: 20,
              }}
              onPress={() => {
                this.gotoOrderTab();
              }}>
              <View
                style={{
                  height: 100,
                  backgroundColor: '#d5a4f8',
                  borderRadius: 30,
                  padding: 15,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
                  Thông báo
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 30,
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="foundation"
                    name="megaphone"
                    size={25}
                    color="#ffba1b"
                  />
                  <Text style={{color: 'white', marginLeft: 10}}>
                    Bạn đang có {totalAcceptedOrder} cuốc xe đang sửa
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : null}

          <View style={{marginTop: 10}}>
            <View style={styles.containerItem}>
              <TouchableOpacity
                style={[styles.containerItem, styles.item]}
                onPress={() => {
                  this.gotoOrderTab();
                }}>
                <Image
                  source={require('../../assets/image/good-pincode.png')}
                  style={{width: 40, height: 40}}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: '#4e5e77'}}>Tỉ lệ thành công</Text>
                  <Text style={styles.textNumber}>
                    {' '}
                    {rateSuccess.toFixed(2)} %
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.containerItem, styles.item]}
                onPress={() => {
                  showModalNavigation(
                    'revenueStatistics',
                    null,
                    'Thống kê doanh thu',
                  );
                }}>
                <Image
                  source={require('../../assets/image/sales-performance.png')}
                  style={{width: 40, height: 40}}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: '#4e5e77'}}>Doanh thu</Text>
                  <Text style={styles.textNumber}>
                    {' '}
                    {revenueMonth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' vnd'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.containerItem}>
              <TouchableOpacity
                style={[styles.containerItem, styles.item]}
                onPress={() => {
                  this.gotoOrderTab();
                }}>
                <Image
                  source={require('../../assets/image/order.png')}
                  style={{width: 40, height: 40}}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: '#4e5e77'}}>Số đơn hàng</Text>
                  <Text style={styles.textNumber}>{totalOrder}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.containerItem, styles.item]}>
                <Image
                  source={require('../../assets/image/icons8-star.png')}
                  style={{width: 40, height: 40}}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: '#4e5e77'}}>Đánh giá</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.textNumber}>5</Text>
                    <Icon
                      type="foundation"
                      name="star"
                      size={20}
                      color="#ffba1b"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: '#eef4fc',
    padding: 15,
    borderRadius: 20,
    width: 170,
    margin: 10,
  },
  textNumber: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#364864',
  },
  containerRating: {
    width: '50%',
    paddingVertical: 40,
  },
  rating: {
    fontSize: 35,
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
  title: {
    fontSize: 18,
  },

  imageAvatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  notificationName: {
    marginHorizontal: 10,
  },
});
const mapStateToProps = store => {
  return {
    allStation: store.StationReducers.allStation,
    stationInformation: store.StationReducers.station,
    isChangePower: store.StationReducers.changePower,
    dataOrders: store.OrderReducers.dataOrder,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMyAccount: () => {
      dispatch(authenticationAction.getMyAccount());
    },
    changePower: (stationId, isOn) => {
      dispatch(stationAction.changePower(stationId, isOn));
    },
    getMyStation: () => {
      dispatch(stationAction.getMyStation());
    },
    getStationById: id => {
      dispatch(stationAction.getStationById(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeFixer);
