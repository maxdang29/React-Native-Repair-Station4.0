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
import {format} from 'date-fns';
class RevenueStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  handleSubmit=()=>{
      
  }
  render() {
    const {stationInformation, isChangePower, dataOrders} = this.props;
    return (
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
                  <Text style={styles.textModal}>DỊCH VỤ</Text>
                </View>
                <View
                  style={[
                    styles.row,
                    {justifyContent: 'flex-end', marginRight: 10},
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
                    onPress={() => this.handleSubmit()}>
                    <Text style={{color: 'white'}}>Hoàn tất</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

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
                Navigation.dismissModal(this.props.componentId);
              }}>
              <Icon type="feather" name="arrow-left" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Icon type="feather" name="filter" size={30} />
            </TouchableOpacity>
          </View>

          <LineChart
            data={{
              labels: [
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
              ],
              datasets: [
                {
                  data: [10, 20, 50, 30, 10, 20, 50, 30, 10, 20, 50, 12],
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
              //   console.log('error', JSON.stringify(labels, null, 4));
              //   this.showDataPointChart(value, labels);
            }}
          />
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
            Doanh thu các tháng
          </Text>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a4c49',
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
export default connect(mapStateToProps, mapDispatchToProps)(RevenueStatistics);
