import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import InputText from '../../components/textInput';
import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import messaging from '@react-native-firebase/messaging';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {STATION} from '../../constants/roles';

import startApp from '../../navigation/bottomTab';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      password: null,
      confirmPassword: null,
      phone: null,
      passwordError: null,
      userNameError: null,
      confirmPasswordError: null,
      phoneError: null,
      message: null,
    };
  }

  componentDidUpdate() {
    const {onLogin} = this.props;
    if (onLogin) {
      // startApp();
    }
  }

  componentDidMount() {
    this.props.getAllStation();

    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          this.onchangeText('tokenDevice', fcmToken);
        }
      });
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
      password,
      userName,
      phone,
      confirmPassword,
      passwordError,
      userNameError,
      confirmPasswordError,
      phoneError,
    } = this.state;
    const {allStation} = this.props;

    if (!password) this.onchangeText('passwordError', 'Nhập mật khẩu');
    else this.onchangeText('passwordError', null);
    if (!userName) this.onchangeText('userNameError', 'Nhập tên');
    else this.onchangeText('userNameError', null);
    if (!phone) this.onchangeText('phoneError', 'Nhập số điện thoại');
    else this.onchangeText('phoneError', null);
    if (confirmPassword !== password)
      this.onchangeText(
        'confirmPasswordError',
        'Mật khẩu đó không khớp, hãy thử lại',
      );
    else this.onchangeText('confirmPasswordError', null);

    if (password && userName && phone && confirmPassword === password) {
      const user = {
        name: userName,
        phoneNumber: phone,
        password: password,
        role: STATION,
        phoneNumberConfirmed: false,
      };
      this.props.register(user, this.props.componentId);
      this.setState({message: null});
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
      passwordError,
      userNameError,
      phoneError,
      confirmPasswordError,
      message,
    } = this.state;
    const {error, loading} = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng kí</Text>
          <View>
            <InputText
              ref={ref => (this.userName = ref)}
              onSubmitEditing={() => {
                this.focusNextField('address');
              }}
              onchangeText={value => this.onchangeText('userName', value)}
              title="Họ và tên: *"
              error={userNameError}
              icon="https://img.icons8.com/ios/2x/user-male-circle.png"
            />
            <InputText
              ref={ref => (this.phone = ref)}
              onSubmitEditing={() => {
                this.focusNextField('password');
              }}
              type="numeric"
              onchangeText={value => this.onchangeText('phone', value)}
              title="Số điện thoại *"
              error={this.filterError('phoneError', error, 'PhoneNumber')}
              icon="https://img.icons8.com/ios/2x/phone.png"
            />
            <InputText
              ref={ref => (this.password = ref)}
              onSubmitEditing={() => {
                this.focusNextField('confirmPassword');
              }}
              onchangeText={value => this.onchangeText('password', value)}
              title="Mật khẩu *"
              error={this.filterError('passwordError', error, 'Password')}
              icon="https://img.icons8.com/ios/2x/password.png"
              isSecureTextEntry={true}
            />
            <InputText
              ref={ref => (this.confirmPassword = ref)}
              onchangeText={value =>
                this.onchangeText('confirmPassword', value)
              }
              title="Xác nhận mật khẩu *"
              error={confirmPasswordError}
              icon="https://img.icons8.com/ios/2x/reviewer-female.png"
              isSecureTextEntry={true}
            />
          </View>
          {message ? (
            <View style={styles.containerError}>
              <Icon name="ios-alert" style={styles.error} />
              <Text style={[styles.error, styles.textError]}>{message}</Text>
            </View>
          ) : null}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Navigation.dismissModal(this.props.componentId)}>
              <Text style={styles.text}>Đăng nhập</Text>
            </TouchableOpacity>
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
            <View tyle={styles.containerError}>
              <Text style={[styles.error]}> {error} </Text>
            </View>
          ) : null}
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
});
const mapStateToProps = store => {
  return {
    onLogin: store.AuthenticationReducers.onLogin,
    allStation: store.AuthenticationReducers.allStation,
    error: store.AuthenticationReducers.errorRegister,
    loading: store.AuthenticationReducers.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (data, componentId) => {
      dispatch(authenticationAction.register(data, componentId));
    },
    getAllStation: () => {
      dispatch(authenticationAction.getAllStation());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
