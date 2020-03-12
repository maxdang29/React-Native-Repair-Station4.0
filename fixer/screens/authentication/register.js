import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import InputText from '../../components/textInput';
import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import firebase from 'react-native-firebase';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import startApp from '../../navigation/bottomTab';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'nam nam',
      address: 'Đội 4, Minh Tiến, Thái Thủy',
      password: '123123123',
      confirmPassword: '123123123',
      phone: '123123123',
      addressError: null,
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
      startApp();
    }
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
      password,
      userName,
      phone,
      confirmPassword,
      addressError,
      passwordError,
      userNameError,
      confirmPasswordError,
      phoneError,
    } = this.state;
    const {allStation} = this.props;

    if (address && password && userName && phone && confirmPassword) {
      const user = {
        address: address,
        password: password,
        nameStore: userName,
        phoneNumber: phone,
        available: true,
        hasAmbulatory: false,
        starRating: 0,
        totalRating: 0,
      };
      const found = allStation.filter(element => {
        return element.phoneNumber === user.phoneNumber;
      });
      if (found.length > 0) {
        this.setState({message: 'Số điện thoại này đã tồn tại!'});
      } else {
        this.props.register(user, this.props.componentId);
        this.setState({message: null});
      }
    } else {
      if (!address) this.onchangeText('addressError', 'Nhập địa chỉ');
      else this.onchangeText('addressError', null);
      if (!password) this.onchangeText('passwordError', 'Nhập mật khẩu');
      else this.onchangeText('passwordError', null);
      if (!userName) this.onchangeText('userNameError', 'Nhập tên đăng nhập');
      else this.onchangeText('userNameError', null);
      if (!phone) this.onchangeText('phoneError', 'Nhập số điện thoại');
      else this.onchangeText('phoneError', null);
      if (confirmPassword !== password)
        this.onchangeText(
          'confirmPasswordError',
          'Mật khẩu đó không khớp, hãy thử lại',
        );
      else this.onchangeText('confirmPasswordError', null);
    }
  };
  render() {
    const {
      addressError,
      passwordError,
      userNameError,
      phoneError,
      confirmPasswordError,
      message,
    } = this.state;

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
              title="Tên cửa hàng *"
              error={userNameError}
              icon="https://img.icons8.com/dotty/2x/online-store.png"
            />
            <InputText
              ref={ref => (this.address = ref)}
              onSubmitEditing={() => {
                this.focusNextField('phone');
              }}
              onchangeText={value => this.onchangeText('address', value)}
              title="Địa chỉ *"
              error={addressError}
              icon="https://img.icons8.com/ios/2x/address.png"
            />
            <InputText
              ref={ref => (this.phone = ref)}
              onSubmitEditing={() => {
                this.focusNextField('password');
              }}
              type="numeric"
              onchangeText={value => this.onchangeText('phone', value)}
              title="Số điện thoại *"
              error={phoneError}
              icon="https://img.icons8.com/ios/2x/phone.png"
            />
            <InputText
              ref={ref => (this.password = ref)}
              onSubmitEditing={() => {
                this.focusNextField('confirmPassword');
              }}
              onchangeText={value => this.onchangeText('password', value)}
              title="Mật khẩu *"
              error={passwordError}
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
              <Text style={{color: 'white'}}>Đăng kí</Text>
            </TouchableOpacity>
          </View>
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
  },
  textError: {
    marginLeft: 14,
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
    register: (data, componentId) => {
      dispatch(authenticationAction.register(data, componentId));
    },
    getAllStation: () => {
      dispatch(authenticationAction.getAllStation());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
