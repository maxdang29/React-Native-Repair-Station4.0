import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions, TextInput, Text, FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';
import MapView from 'react-native-maps';
import { Icon, ListItem } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

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

class SearchStation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: 0,
      longitude: 0,
      searching: false,
      searchStarted: false,
      address: "",
      positions: []
    }
    this._mapView = null;
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    const { componentId } = this.props;
    if (buttonId === 'back') {
      Navigation.dismissModal(componentId);
    }
  }

  handleChangeText = address => {
    this.setState({ address }, () => this.handleSearchLocation())
  }

  handleSearchLocation = async () => {
    try {
      let { address, positions } = this.state
      this.setState({ positions: [], searching: true, searchStarted: true })
      if (address.length > 10) {
        positions = await Geocoder.geocodeAddress(address)
      }
      this.setState({ positions, searching: false })
    } catch (error) {
      console.log("error: ", error)
    }
  }

  handlePlaceSelected = place => {
    const location = {
      address: place.formattedAddress.replace('Unnamed Road, ', ''),
      coords: place.position,
    }
    this._mapView.animateToCoordinate({
      latitude: location.coords.lat,
      longitude: location.coords.lng
    }, 1000);
    this.setState({
      address: location.address,
      latitude: location.coords.lat,
      longitude: location.coords.lng,
    });
  }

  render() {
    const { searchStarted, searching, address, positions } = this.state;
    return (
      <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          <TextInput
            style={{ flex: 1, fontSize: 18, color: 'black' }}
            onChangeText={address => this.handleChangeText(address)}
            placeholder={'Search...'}
            value={this.state.address}
          />
          <TouchableOpacity onPress={() => this.handleChangeText(address)}>
            <Icon type="feather" name="search" />
          </TouchableOpacity>
        </View>
        {
          (!searching && searchStarted && address.length > 10 && positions.length < 1)
            ?
            <Text style={{
              textAlign: "center",
              fontSize: 16,
              paddingVertical: 5
            }}>
              Không tìm thấy kết quả
            </Text>
            :
            <FlatList
              data={positions}
              renderItem={({ item }) =>
                <ListItem
                  title={item.formattedAddress.replace('Unnamed Road, ', '')}
                  onPress={() => this.handlePlaceSelected(item)}
                  bottomDivider
                />}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
        }
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = store => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchStation);
