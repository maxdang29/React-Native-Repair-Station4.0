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

  render() {
    const {orderRevenue} = this.props;
    const dataChart = this.filterRevenue();
    if (dataChart) {
      return (
        <View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>

          <LinearGradient
            colors={['#f4f6f9', '#f4f6f9', '#f4f6f9']}
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
                decimalPlaces: 0, // optional, defaults to 2dp
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
            />
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
