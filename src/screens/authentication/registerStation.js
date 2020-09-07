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
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import InputText from '../../components/textInput';
import {connect} from 'react-redux';
import * as stationAction from '../../redux/station/actions/actions';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import startApp from '../../navigation/bottomTab';
import {CAR, MOTORBIKE} from '../../constants/vehicles';
import Geocoder from 'react-native-geocoder';
import {ListItem} from 'react-native-elements';
const vehicles = [
  {label: 'Chọn phương tiện', value: ''},
  {label: 'Xe máy', value: MOTORBIKE},
  {label: 'Xe otô', value: CAR},
];
class RegisterStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationName: null,
      address: null,
      vehicle: null,
      addressError: null,
      stationNameError: null,
      vehicleError: null,
      message: null,
      latitude: 0,
      longitude: 0,
      searching: false,
      searchStarted: false,
      isShowListSearch: false,
      positions: [],
      modalVisible: false,
    };
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({buttonId}) {
    const {componentId} = this.props;
    if (buttonId === 'back') {
      Navigation.dismissModal(componentId);
    }
  }
  handleSearchLocation = async () => {
    try {
      let {address, positions} = this.state;
      this.setState({
        positions: [],
        searching: true,
        isShowListSearch: true,
        searchStarted: true,
      });
      if (address.length > 10) {
        positions = await Geocoder.geocodeAddress(address);
      }
      this.setState({positions, searching: false});
    } catch (error) {
      console.log('error: ', error);
    }
  };

  handlePlaceSelected = place => {
    const location = {
      address: place.formattedAddress.replace('Unnamed Road, ', ''),
      coords: place.position,
    };
    this.setState({
      isShowListSearch: false,
      address: location.address,
      latitude: location.coords.lat,
      longitude: location.coords.lng,
      modalVisible: false,
    });
  };

  onchangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
    if (value && value !== '') {
      switch (key) {
        case 'address':
          this.handleSearchLocation();
          break;
        default:
          break;
      }
    }
  };
  focusNextField(nextField) {
    this[nextField].focus();
  }
  register = async () => {
    const {
      address,
      stationName,
      vehicle,
      addressError,
      stationNameError,
      vehicleError,
    } = this.state;
    const {allStation} = this.props;
    let lat = 16.04331,
      lng = 108.21332;
    await Geocoder.geocodeAddress(address)
      .then(res => {
        // res is an Array of geocoding object (see below)
        lat = res[0].position.lat;
        lng = res[0].position.lng;
      })
      .catch(err => console.log(err));

    if (stationName && stationName && vehicle) {
      const station = {
        name: stationName,
        address: address,
        vehicle: vehicle,
        latitude: lat,
        longitude: lng,
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
  filterError = (key, error, fieldName) => {
    let result;
    let errorField = this.state[key];
    if (errorField) return errorField;
    if (typeof error === 'object')
      result = error.find(err => err.propertyName === fieldName);
    return result ? result.errorMessage : null;
  };
  render() {
    const {
      addressError,
      stationNameError,
      vehicleError,
      message,
      vehicle,
      modalVisible,
    } = this.state;
    const {
      searchStarted,
      searching,
      address,
      positions,
      isShowListSearch,
    } = this.state;
    const {error, loading} = this.props;
    return (
      <ScrollView>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <View style={{background: 'red'}}>
            <View
              style={styles.container}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  style={{flex: 1, fontSize: 18, color: 'black'}}
                  onChangeText={value => this.onchangeText('address', value)}
                  placeholder={'Tìm kiếm địa chỉ...'}
                  value={address}
                />
                <TouchableOpacity onPress={() => this.onchangeText(address)}>
                  <Icon type="feather" name="search" />
                </TouchableOpacity>
              </View>
            </View>
            {!isShowListSearch ? null : !searching &&
              searchStarted &&
              address.length > 10 &&
              positions.length < 1 ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  paddingVertical: 5,
                }}>
                Không tìm thấy kết quả
              </Text>
            ) : (
              <FlatList
                data={positions}
                renderItem={({item}) => (
                  <ListItem
                    title={item.formattedAddress.replace('Unnamed Road, ', '')}
                    onPress={() => this.handlePlaceSelected(item)}
                    bottomDivider
                  />
                )}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </Modal>
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
              error={this.filterError('stationNameError', error, 'Name')}
              icon="https://img.icons8.com/dotty/2x/online-store.png"
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({modalVisible: true});
              }}>
              <InputText
                ref={ref => (this.address = ref)}
                onchangeText={value => this.onchangeText('address', value)}
                title="Địa chỉ: *"
                error={addressError}
                icon="https://img.icons8.com/ios/2x/address.png"
                value={address}
                editable={false}
              />
            </TouchableOpacity>

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
    marginLeft: 0,
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
