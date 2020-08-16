import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, Image, FlatList, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as stationAction from '../../redux/station/actions/actions';
import MapView from 'react-native-maps';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoder';
import {Navigation} from 'react-native-navigation';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.004922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const STYLE_MAP = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];

class ProfileStation extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.stationInformation !== prevState.stationInformation) {
      return {
        address: nextProps.stationInformation.address,
        hasAmbulatory: nextProps.stationInformation.hasAmbulatory,
        latitude: nextProps.stationInformation.latitude,
        longitude: nextProps.stationInformation.longitude,
        name: nextProps.stationInformation.name,
        owner: nextProps.stationInformation.owner,
        phone: nextProps.stationInformation.owner ? nextProps.stationInformation.owner.phoneNumber : "",
        services: nextProps.stationInformation.services,
        vehicle: nextProps.stationInformation.vehicle,
        stationInformation: nextProps.stationInformation
      };
    }
    else return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      address: "",
      emailError: null,
      phone: "",
      phoneError: null,
      hasAmbulatory: false,
      latitude: 0,
      longitude: 0,
      name: "",
      owner: {},
      services: [],
      vehicle: "",
      editMode: false,
      stationInformation: {},
      indexItemEditing: -1,
      nameItem: null,
      priceItem: null,
    };
    this._mapView = null;
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  async componentDidMount() {
    const stationId = await AsyncStorage.getItem('stationId');
    this.props.getStationById(stationId);
  }

  navigationButtonPressed({buttonId}) {
    const {componentId} = this.props;
    if (buttonId === 'back') {
      Navigation.dismissModal(componentId);
    }
  }

  // TODO: Error with message "You must enable Billing on the Google Cloud Project"
  convertAddressToLatLong = () => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=AIzaSyC5_5R7U9OrXn478uXviYcSRELdkeP3QMI')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
        this.setState({
          latitude: responseJson.results.geometry.location.lat,
          longitude: responseJson.results.geometry.location.lng,
        })
      })
  }

  onchangeText = (key, value) => {
    if (value && value !== "") {
      switch (key) {
        case 'phone':
          this.state.phoneError = null;
          break;
        case 'address':
          this.state.addressError = null;
          break;
        default:
          break;
      }
    } else {
      switch (key) {
        case 'phone':
          this.state.phoneError = 'Vui lòng nhập số điện thoại';
          break;
        case 'address':
          this.state.addressError = 'Vui lòng nhập địa chỉ';
          break;
        default:
          break;
      }
    }
    this.setState({
      [key]: value,
    });
  };

  focusNextField(nextField) {
    this[nextField].focus();
  }

  handleUpdateButton = async () => {
    let lat = 16.04331, lng = 108.21332;
    await Geocoder.geocodeAddress(this.state.address).then(res => {
      // res is an Array of geocoding object (see below)
      lat = res[0].position.lat;
      lng = res[0].position.lng;
    }).catch(err => console.log(err));
    let data = {
      id: this.state.stationInformation.id,
      address: this.state.address,
      latitude: lat,
      longitude: lng,
      hasAmbulatory: this.state.hasAmbulatory,
      owner: { name: this.state.owner.name, phoneNumber: this.state.phone },
      services: this.state.services,
    };
    await this.props.changeStationById(this.state.stationInformation.id, data);
    this._mapView.animateToCoordinate({
      latitude: lat,
      longitude: lng
    }, 1000);
    this.setState({
      latitude: lat,
      longitude: lng
    });
  }

  handleEditItem = (item) => {
    const services = this.state.services;
    const index = services.indexOf(item);
    if (index > -1) {
      if (this.state.nameItem) {
        services[index].name = this.state.nameItem;
      }
      if (this.state.priceItem) {
        services[index].price = this.state.priceItem;
      }
    }
    this.setState({
      services: services,
      indexItemEditing: -1
    });
  }

  handleDeleteItem = (item) => {
    const services = this.state.services;
    const index = services.indexOf(item);
    if (index > -1) { services.splice(index, 1) }
    this.setState({
      services: services
    });
  }

  render() {
    return (
      <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <MapView
          provider={'google'}
          ref={c => this._mapView = c}
          zoomEnabled={true}
          showsUserLocation={true}
          followUserLocation={true}
          showsCompass={false}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={{ width: width, height: height }}
          customMapStyle={STYLE_MAP}
        >
          <MapView.Marker
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            draggable
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          />
        </MapView>

        <View style={{ position: 'absolute', top: 10, left: 10, right: 10, justifyContent: 'center', borderRadius: 10, paddingVertical: 10, backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text numberOfLines={1} style={{ flex: 1, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Tiệm Xe {this.state.name}</Text>
            <TouchableOpacity onPress={() => this.setState({ editMode: !this.state.editMode }, () => !this.state.editMode ? this.handleUpdateButton() : {})}>
              <Image
                style={[styles.edit, { marginRight: 10 }]}
                source={this.state.editMode ? require("../../assets/image/icon-done.png") : require("../../assets/image/icon-edit.png")}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text numberOfLines={1} style={{ fontSize: 18, textAlign: 'left', marginLeft: 10 }}>- Địa chỉ: </Text>
              <TextInput
                editable={this.state.editMode}
                style={{ flex: 1, fontSize: 18, color: 'black' }}
                keyboardType={"default"}
                onChangeText={text => this.onchangeText('address', text)}
                value={this.state.address}
              />
            </View>
            {this.state.emailError ? (
              <View style={styles.errorContent}>
                <Icon name="ios-alert" style={styles.iconError} />
                <Text style={styles.textError}>{this.state.emailError}</Text>
              </View>
            ) : null}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text numberOfLines={1} style={{ fontSize: 18, textAlign: 'left', marginLeft: 10 }}>- Số điện thoại: </Text>
              <TextInput
                editable={this.state.editMode}
                style={{ flex: 1, fontSize: 18, color: 'black' }}
                keyboardType={"numeric"}
                onChangeText={text => this.onchangeText('phone', text)}
                value={this.state.phone}
              />
            </View>
            {this.state.phoneError ? (
              <View style={styles.errorContent}>
                <Icon name="ios-alert" style={styles.iconError} />
                <Text style={styles.textError}>{this.state.phoneError}</Text>
              </View>
            ) : null}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text numberOfLines={1} style={{ fontSize: 18, textAlign: 'left', marginLeft: 10 }}>- Cứu hộ xe: </Text>
              <CheckBox
                disabled={!this.state.editMode}
                value={this.state.hasAmbulatory}
                onValueChange={(newValue) => this.setState({ hasAmbulatory: newValue })}
              />
            </View>
          </View>
        </View>

        <View style={{ position: 'absolute', bottom: 10, left: 10, right: 10, justifyContent: 'center', borderRadius: 10, paddingVertical: 10, backgroundColor: 'white' }}>
          <Text numberOfLines={1} style={{ fontSize: 18, textAlign: 'left', marginLeft: 10, marginTop: 5 }}>Bảng giá dịch vụ: </Text>
          <FlatList
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ height: 200 }}
            data={this.state.services}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginLeft: 10,
                    backgroundColor: 'gray',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginHorizontal: 5,
                  }}>
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <TextInput
                      editable={false}
                      style={{ fontSize: 16, fontWeight: 'bold', color: 'black', }}
                      keyboardType={"default"}
                      value={`${item.name}`}
                    />
                    <Text style={{ fontSize: 16, color: 'black' }}>: </Text>
                    <TextInput
                      editable={false}
                      style={{ fontSize: 16, color: 'black' }}
                      keyboardType={"numeric"}
                      value={`${item.price}`}
                    />
                    <TextInput
                      editable={false}
                      style={{ fontSize: 12, color: 'black' }}
                      value={` (VNĐ)`}
                    />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  edit: { width: 20, height: 20 },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  textError: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
});

const mapStateToProps = store => {
  return {
    stationInformation: store.StationReducers.station,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStationById: id => {
      dispatch(stationAction.getStationById(id));
    },
    changeStationById: (stationId, data) => {
      dispatch(stationAction.changeStationById(stationId, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStation);
