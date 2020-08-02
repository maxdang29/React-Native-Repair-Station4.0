import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Picker,
  ActivityIndicator,
} from 'react-native';
import InputText from '../../components/textInput';
import {connect} from 'react-redux';
import * as stationAction from '../../redux/station/actions/actions';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import startApp from '../../navigation/bottomTab';
import {CAR, MOTORBIKE} from '../../constants/vehicles';
const vehicles = [
  {label: 'Chọn phương tiện', value: ''},
  {label: 'Xe máy', value: MOTORBIKE},
  {label: 'Xe otô', value: CAR},
];
class RegisterStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationName: 'Nam Ita',
      address: '30 Nguyễn hữu thoại',
      vehicle: MOTORBIKE,
      addressError: null,
      stationNameError: null,
      vehicleError: null,
      message: null,
    };
  }

  onchangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  focusNextField(nextField) {
    this[nextField].focus();
  }
  register = () => {
    const {
      address,
      stationName,
      vehicle,
      addressError,
      stationNameError,
      vehicleError,
    } = this.state;
    const {allStation} = this.props;

    if (stationName && stationName && vehicle) {
      const station = {
        name: stationName,
        address: address,
        vehicle: vehicle,
        latitude: 16.04331,
        longitude: 108.21332,
      };
      this.props.registerStation(station, this.props.componentId);
      this.setState({message: null});
    } else {
      if (!address) this.onchangeText('addressError', 'Nhập địa chỉ');
      else this.onchangeText('addressError', null);
      if (!stationName)
        this.onchangeText('stationNameError', 'Nhập tên cửa hàng');
      else this.onchangeText('stationNameError', null);
      if (!vehicle) this.onchangeText('vehicleError', 'Chọn phương tiện');
      else this.onchangeText('vehicleError', null);
    }
  };
  filterError = (error, fieldName) => {
    if (typeof error === 'object' && error.propertyName)
      return error.find(err => err.propertyName === fieldName).errorMessage;
  };
  render() {
    const {
      addressError,
      stationNameError,
      vehicleError,
      message,
      vehicle,
    } = this.state;
    const {error, loading} = this.props;
    console.log('weeeeee', error);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng kí thông tin cửa hàng</Text>
          <View>
            <InputText
              ref={ref => (this.stationName = ref)}
              onSubmitEditing={() => {
                this.focusNextField('address');
              }}
              onchangeText={value => this.onchangeText('stationName', value)}
              title="Tên cửa hàng: *"
              error={
                stationNameError
                  ? stationNameError
                  : this.filterError(error, 'Name')
              }
              icon="https://img.icons8.com/dotty/2x/online-store.png"
            />
            <InputText
              ref={ref => (this.address = ref)}
              onSubmitEditing={() => {
                this.focusNextField('phone');
              }}
              onchangeText={value => this.onchangeText('address', value)}
              title="Địa chỉ"
              error={addressError}
              icon="https://img.icons8.com/ios/2x/address.png"
            />
            <View style={styles.vehicleContainer}>
              <Image
                source={{uri: 'https://img.icons8.com/wired/2x/automotive.png'}}
                style={styles.image}
              />
              <Picker
                onValueChange={(itemValue, itemIndex) =>
                  this.onchangeText('vehicle', itemValue)
                }
                selectedValue={vehicle}
                style={styles.itemStyle}
                mode="dropdown">
                {vehicles.map((item, index) => (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    index={index}
                  />
                ))}
              </Picker>
            </View>
            {vehicleError ? (
              <View style={[styles.containerError, {marginLeft: 50}]}>
                <Icon name="ios-alert" style={styles.error} />
                <Text style={[styles.error, styles.textError]}>
                  {vehicleError}
                </Text>
              </View>
            ) : null}
          </View>
          {message ? (
            <View style={styles.containerError}>
              <Icon name="ios-alert" style={styles.error} />
              <Text style={[styles.error, styles.textError]}>{message}</Text>
            </View>
          ) : null}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#00a7e7'}]}
              onPress={() => this.register()}>
              {loading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={{color: 'white'}}>Đăng kí</Text>
              )}
            </TouchableOpacity>
          </View>
          {typeof error === 'string' ? (
            <View style={styles.containerError}>
              <Text style={[styles.error]}> {error} </Text>
            </View>
          ) : (
            <View style={styles.containerError}>
              <Text style={[styles.error]}> {error[0].errorMessage} </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    margin: 20,
  },
  text: {
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    padding: 15,
    borderColor: '#00a7e7',
    borderWidth: 1,
    width: 230,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  containerError: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  textError: {
    marginLeft: 14,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginLeft: 17,
  },
  vehicleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemStyle: {
    width: 300,
    color: 'gray',
    marginVertical: 13,
  },
});
const mapStateToProps = store => {
  return {
    error: store.StationReducers.error,
    loading: store.StationReducers.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerStation: (data, componentId) => {
      dispatch(stationAction.registerStation(data, componentId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStation);
