import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Navigation} from 'react-native-navigation';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';
class HomeFixer extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.props.getStationInformation();
  }
  changeToggleSwitch = isOn => {
    this.props.changePower(this.props.stationInformation.id, isOn);
  };
  render() {
    const {stationInformation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.getRepair}>
          <Text style={{fontSize: 20, fontFamily: 'Iowan Old Style'}}>
            Sẵn sàng nhận sửa xe
          </Text>

          <ToggleSwitch
            isOn={stationInformation.hasAmbulatory}
            onColor="#44db5e"
            offColor="red"
            size="medium"
            onToggle={isOn => this.changeToggleSwitch(isOn)}
          />
        </View>
        <MapView style={{height: '50%'}} />
        <View style={styles.containerInfor}>
          <Text style={styles.nameRepair}>
            Tiệm sửa xe {stationInformation.nameStore}
          </Text>
          <View style={styles.information}>
            <View style={{padding: 5}}>
              <Text style={[styles.textAlign, styles.title]}>
                Tỷ lệ hoàn thành
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{padding: 10}}>
                  <Icon
                    style={styles.icon}
                    name="ios-checkmark-circle-outline"
                    size={35}
                  />
                  <Text style={styles.textAlign}>100%</Text>
                  <Text style={styles.textAlign}>Hằng ngày</Text>
                </View>
                <View style={{padding: 10}}>
                  <Icon
                    style={styles.icon}
                    name="ios-checkmark-circle-outline"
                    size={35}
                  />
                  <Text style={styles.textAlign}>100%</Text>
                  <Text style={styles.textAlign}>Hằng ngày</Text>
                </View>
              </View>
            </View>
            <View style={{padding: 5}}>
              <Text style={[styles.textAlign, styles.title]}>Đánh giá</Text>

              <View style={{padding: 10}}>
                <Icon style={styles.icon} name="ios-star-outline" size={35} />
                <Text style={styles.textAlign}>
                  {stationInformation.totalRating}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  nameRepair: {
    fontSize: 22,
    textAlign: 'center',
    padding: 20,
    fontFamily: 'Iowan Old Style',
    fontWeight: 'bold',
  },

  getRepair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  containerInfor: {
    marginTop: -3,
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: 'gray',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  textAlign: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#00a7e7',
    borderRadius: 5,
  },
  icon: {
    color: '#44db5e',
    textAlign: 'center',
    marginBottom: 10,
  },
});
const mapStateToProps = store => {
  return {
    stationInformation: store.AuthenticationReducers.stationInformation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getStationInformation: service => {
      dispatch(authenticationAction.getStationById());
    },
    changePower: (stationKey, status) => {
      dispatch(authenticationAction.changePower(stationKey, status));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeFixer);
