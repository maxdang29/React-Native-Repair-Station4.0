import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import InputText from '../../components/textInput';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import firebase from 'react-native-firebase';
import {showModalNavigation} from '../../navigation/function';
import startApp from '../../navigation/bottomTab';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '0368947444',
      password: '123123123',
      phoneError: null,
      passwordError: null,
      message: null,
      tokenDevice: null,
    };
  }
  componentDidMount() {
    this.props.getAllStation();
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          this.onchangeText('tokenDevice', fcmToken);
        } else {
          // user doesn't have a device token yet
        }
      });
  }

  componentDidUpdate() {
    const {onLogin} = this.props;
    if (onLogin) {
      startApp();
    }
  }
  onchangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  focusNextField(nextField) {
    this[nextField].focus();
  }
  login = async () => {
    const {
      phone,
      password,
      phoneError,
      passwordError,
      tokenDevice,
    } = this.state;
    const {allStation} = this.props;
    if (phone && password) {
      const user = {
        phoneNumber: phone,
        password: password,
      };

      let station = allStation.find(element => {
        return (
          element.phoneNumber === user.phoneNumber &&
          element.password === user.password
        );
      });

      if (station) {
        this.props.login(station.id, tokenDevice);
        await AsyncStorage.setItem('stationData', JSON.stringify(station));
      } else {
        this.setState({
          message: 'Số điện thoại hoăc mật khẩu không chính xác!',
        });
      }
    } else {
      if (!phone) this.onchangeText('phoneError', 'Nhập số điện thoại');
      else this.onchangeText('phoneError', '');
      if (!password) this.onchangeText('passwordError', 'Nhập mật khẩu');
      else this.onchangeText('passwordError', '');
    }
  };
  render() {
    const {phoneError, passwordError, message} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View>
          <InputText
            ref={ref => (this.phone = ref)}
            onSubmitEditing={() => {
              this.focusNextField('password');
            }}
            onchangeText={value => this.onchangeText('phone', value)}
            title="Số điện thoại *"
            error={phoneError}
            icon="https://img.icons8.com/ios/2x/phone.png"
            type="numeric"
          />
          <InputText
            ref={ref => (this.password = ref)}
            onchangeText={value => this.onchangeText('password', value)}
            title="Mật khẩu *"
            error={passwordError}
            isSecureTextEntry={true}
            icon="https://img.icons8.com/ios/2x/password.png"
          />
          {message ? (
            <View style={styles.containerError}>
              <Icon name="ios-alert" style={styles.error} />
              <Text style={[styles.error, styles.textError]}>{message}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#00a7e7'}]}
            onPress={() => this.login()}>
            <Text style={{color: 'white'}}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => showModalNavigation('register')}>
            <Text style={styles.text}>Đăng Kí</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Quên mật khẩu?</Text>
      </View>
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
    padding: 10,
    borderColor: '#00a7e7',
    borderWidth: 1,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  containerError: {
    flexDirection: 'row',
    marginLeft: 50,
    marginTop: -5,
    alignContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  textError: {
    marginLeft: 10,
  },
});
const mapStateToProps = store => {
  return {
    onLogin: store.AuthenticationReducers.onLogin,
    allStation: store.AuthenticationReducers.allStation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllStation: () => {
      dispatch(authenticationAction.getAllStation());
    },
    login: (stationId, tokenDevice) => {
      dispatch(authenticationAction.login(stationId, tokenDevice));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
