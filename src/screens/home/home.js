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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145d571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571fe29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571ae29d72',
    title: 'Third111 Item',
  },
];

class HomeFixer extends Component {
  constructor(props) {
    super(props);
  }
  changeToggleSwitch = async isOn => {
    console.log('isons', isOn);
    await this.props.changePower(this.props.stationInformation.id, isOn);
  };
  async componentDidUpdate() {
    const {isAvailable} = this.props;
    if (isAvailable) {
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

  render() {
    const {stationInformation} = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: APP_COLOR,
            paddingVertical: 15,
            paddingHorizontal: 15,
            height: 250,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                this.openSideBar();
              }}>
              <Icon name="ios-menu" color={'white'} size={30} />
            </TouchableOpacity>

            <ToggleSwitch
              isOn={stationInformation.isAvailable}
              onColor="#4dc2ff"
              offColor="red"
              size="medium"
              onToggle={isOn => this.changeToggleSwitch(isOn)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 35,
            }}>
            <Image
              source={{
                uri:
                  'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/store.png',
              }}
              style={styles.imageAvatar}
            />
            <Text style={styles.nameRepair}>
              Tiệm xe {stationInformation.name}
            </Text>
          </View>
        </View>

        <View>
          {/* <ScrollView> */}
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                {
                  backgroundColor: '#4dc2ff',
                },
                styles.containerRating,
              ]}>
              <Text style={[styles.rating, styles.textAlign]}>100%</Text>
              <Text style={[styles.textAlign]}>Hoàn thành hằng ngày</Text>
            </View>
            <View
              style={[
                {
                  backgroundColor: '#ff7fe5',
                },
                styles.containerRating,
              ]}>
              <Text style={[styles.rating, styles.textAlign]}>100%</Text>
              <Text style={[styles.textAlign]}>Hoàn thành hằng tháng</Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                width: 90,
                height: 90,
                position: 'absolute',
                left: Dimensions.get('window').width / 2 - 45,
                top: -45,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                {stationInformation.totalRating
                  ? stationInformation.totalRating
                  : 5}
              </Text>
              <Icon name="ios-star-outline" color="#00a7e7" size={30} />
            </View>
          </View>
          <Text style={{margin: 15, fontSize: 20, color: 'gray'}}>HÔM NAY</Text>
          <View style={{height: SCREEN_HEIGHT - 550}}>
            {/* <ScrollView> */}
            <FlatList
              data={DATA}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                  }}>
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: 'red',
                      borderRadius: 50,
                    }}
                  />
                  <Text style={styles.notificationName}>{item.title}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
            />
            {/* </ScrollView> */}
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    isAvailable: store.StationReducers.changePower,
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
