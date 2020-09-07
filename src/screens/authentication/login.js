import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import InputText from '../../components/textInput';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import { showModalNavigation, setRoot } from '../../navigation/function';
import messaging from '@react-native-firebase/messaging';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      password: null,
      phoneError: null,
      passwordError: null,
      message: null,
      tokenDevice: null,
    };
  }
  componentDidMount() {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          this.onchangeText('tokenDevice', fcmToken);
        }
      });
  }

  componentDidUpdate() {
    const { onLogin } = this.props;
    if (onLogin) {
      setRoot('splashScreen');
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
    const { allStation } = this.props;
    if (phone && password) {
      const user = {
        phoneNumber: phone,
        password: password,
      };
      this.props.login(user, tokenDevice);
    } else {
      if (!phone) this.onchangeText('phoneError', 'Nhập số điện thoại');
      else this.onchangeText('phoneError', '');
      if (!password) this.onchangeText('passwordError', 'Nhập mật khẩu');
      else this.onchangeText('passwordError', '');
    }
  };
  render() {
    const { phoneError, passwordError, message } = this.state;
    const { error, loading } = this.props;
    return (
      <ScrollView>
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
              style={styles.button}
              onPress={() => showModalNavigation('register')}>
              <Text style={styles.text}>Đăng Kí</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#00a7e7' }]}
              onPress={() => this.login()}>
              {loading ? (
                <ActivityIndicator size="small" />
              ) : (
                  <Text style={{ color: 'white' }}>Đăng nhập</Text>
                )}
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Quên mật khẩu?</Text>
        </View>
        {typeof error === 'string' ? (
          <View>
            <Text
              style={{
                marginVertical: 40,
                fontSize: 16,
                textAlign: 'center',
                color: 'red',
                marginHorizontal: 30,
              }}>
              {error}{' '}
            </Text>
          </View>
        ) : null}
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
    error: store.AuthenticationReducers.errorLogin,
    loading: store.AuthenticationReducers.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (userData, tokenDevice) => {
      dispatch(authenticationAction.login(userData, tokenDevice));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
