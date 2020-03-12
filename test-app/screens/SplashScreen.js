import React, { Component } from 'react'
import { PermissionsAndroid, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'

export default class SplashScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasLocationPermission: false,
      mapRegion: null,
      lastLatitude: null,
      lastLongtitude: null,
    }
  }
 
  componentDidMount = async () => {
    // let hasLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    // if (!hasLocationPermission) {
    //   hasLocationPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    //   this.setState({ hasLocationPermission })
    //   Geolocation.getCurrentPosition(info => console.log(info))
    // } else {
    //   Geolocation.getCurrentPosition(info => console.log(info))
    // }
    this.watchID = Geolocation.watchPosition((position) => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error) => console.log(error));
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  onRegionChange = (mapRegion, lastLatitude, lastLongitude) => {
    if (this.state.mapRegion !== mapRegion || this.state.lastLatitude !== lastLatitude || this.state.lastLongtitude !== lastLongitude) {
      this.setState({ mapRegion, lastLatitude, lastLongitude });
    }
  }

  render() {
    const { mapRegion, lastLatitude, lastLongitude } = this.state
    const stations = [
      {
        name: 'Sửa xe Văn Khờn',
        latitude: 17.14246101551532,
        longitude: 106.85243164771059
      },
      {
        name: 'Sửa xe Văn Hùng',
        latitude: 17.140636112660435,
        longitude: 106.84671532464385
      },
      {
        name: 'Sửa xe Văn Luận',
        latitude: 17.142096035001885,
        longitude: 106.85335861940807
      }
    ]
    return (
      <MapView
        style={{ height: '100%' }}
        region={mapRegion}
        showsUserLocation={true}
        followUserLocation={true}
      >
        {stations.map(station => <Marker
          key={station.name}
          coordinate={{
            latitude: station.latitude,
            longitude: station.longitude,
          }}
          title={station.name}
        />)}
      </MapView>
    )
  }
}
