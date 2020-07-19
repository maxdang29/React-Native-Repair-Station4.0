import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';
import Icon from 'react-native-vector-icons/Ionicons';

class ProfileUser extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.myInformation !== prevState.myInformation) {
      return {
        name: nextProps.myInformation.name,
        phone: nextProps.myInformation.phoneNumber,
        email: nextProps.myInformation.email,
        address: nextProps.myInformation.address,
        myInformation: nextProps.myInformation
      };
    }
    else return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      address: '',
      phoneError: null,
      emailError: null,
      addressError: null,
      myInformation: {}
    };
    this.props.getMyAccount();
  }

  onchangeText = (key, value) => {
    if (value && value !== "") {
      switch (key) {
        case 'phone':
          this.state.phoneError = null;
          break;
        case 'email':
          this.state.emailError = null;
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
        case 'email':
          this.state.emailError = 'Vui lòng nhập thư điện tử';
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

  isValidData = () => {
    if (this.state.phoneError !== '' && this.state.emailError !== '' && this.state.addressError !== '') {
      return false;
    }
    return true;
  }

  handleResetButton = () => {
    // Reset data
    // this.setState({
    //   phone: '',
    //   email: '',
    //   address: '',
    // });

    // Get data default from api
    this.props.getMyAccount();
  }

  handleUpdateButton = () => {
    let data = JSON.stringify({
      phoneNumber: this.state.phone,
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      deviceToken: "deviceToken" // TODO:
    });
    this.props.updateMyAccount(data);
  }

  render() {
    const { phoneError, emailError, addressError, name, phone, email, address } = this.state;
    return (
      <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Image
          style={styles.backgroundAvatar}
          source={require("../../assets/image/background-avatar-profile.png")}
          resizeMode={'cover'}
        />
        <View style={styles.content}>
          <Image
            style={styles.avatar}
            source={require("../../assets/image/icon-avatar-profile.png")}
            resizeMode={'contain'}
          />
          <View style={styles.mainContent}>
            <View style={styles.nameContainer}>
              <Text numberOfLines={1} style={styles.name}>{name && name !== '' ? name.toUpperCase() : 'NO NAME'}</Text>
            </View>
            <View style={styles.boxContainer}>
              <View
                style={styles.boxContent}
              >
                <Image source={{ uri: "https://img.icons8.com/ios/2x/email.png" }} style={styles.image} />
                <TextInput
                  style={styles.textInput}
                  placeholder={"Email *"}
                  ref={ref => (this.email = ref)}
                  keyboardType={"email-address"}
                  onSubmitEditing={() => {
                    this.focusNextField('phone');
                  }}
                  onChangeText={text => this.onchangeText('email', text)}
                  value={email}
                />
              </View>
              {emailError ? (
                <View style={styles.errorContent}>
                  <Icon name="ios-alert" style={styles.iconError} />
                  <Text style={styles.textError}>{emailError}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.phoneContainer}>
              <View
                style={styles.boxContent}
              >
                <Image source={{ uri: "https://img.icons8.com/ios/2x/phone.png" }} style={styles.image} />
                <TextInput
                  style={styles.textInput}
                  placeholder={"Số điện thoại *"}
                  ref={ref => (this.phone = ref)}
                  onSubmitEditing={() => {
                    this.focusNextField('address');
                  }}
                  keyboardType={"numeric"}
                  onChangeText={text => this.onchangeText('phone', text)}
                  value={phone}
                />
              </View>
              {phoneError ? (
                <View style={styles.errorContent}>
                  <Icon name="ios-alert" style={styles.iconError} />
                  <Text style={styles.textError}>{phoneError}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.boxContainer}>
              <View
                style={styles.boxContent}
              >
                <Image source={{ uri: "https://img.icons8.com/ios/2x/address.png" }} style={styles.image} />
                <TextInput
                  style={styles.textInput}
                  placeholder={"Địa chỉ *"}
                  ref={ref => (this.address = ref)}
                  onSubmitEditing={() => {
                    this.focusNextField('address');
                  }}
                  keyboardType={"default"}
                  onChangeText={text => this.onchangeText('address', text)}
                  value={address}
                />
              </View>
              {addressError ? (
                <View style={styles.errorContent}>
                  <Icon name="ios-alert" style={styles.iconError} />
                  <Text style={styles.textError}>{addressError}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.handleResetButton()}
                style={styles.resetButton}>
                <Image source={{ uri: "https://img.icons8.com/ios/2x/cancel.png" }} style={styles.image} />
                <Text>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleUpdateButton()}
                disabled={this.isValidData()}
                style={styles.updateButton}>
                <Image source={{ uri: "https://img.icons8.com/ios/2x/checked.png" }} style={styles.image} />
                <Text>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundAvatar: { width: '100%', height: 150 },
  content: { flex: 1, width: '100%' },
  avatar: { top: -60, width: 120, height: 120, borderRadius: 30, overflow: 'hidden', alignSelf: 'center' },
  mainContent: { flex: 1, width: '100%', marginTop: -60, marginBottom: 30, alignItems: 'center', backgroundColor: '#fbfbfb' },
  nameContainer: { width: '90%', marginTop: 5, marginBottom: 10, justifyContent: 'center', alignItems: 'center' },
  name: { flex: 1, marginHorizontal: 20, fontSize: 30 },
  boxContainer: {
    width: '90%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxContent: {
    marginHorizontal: 30,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  image: { width: 30, height: 30, marginHorizontal: 10 },
  textInput: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 0.4,
    paddingBottom: 0,
  },
  errorContent: {
    flexDirection: 'row',
    marginLeft: 50,
    marginBottom: 10,
  },
  iconError: {
    color: 'red',
    fontSize: 12,
  },
  textError: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
  phoneContainer: {
    width: '90%',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: { flex: 1, flexDirection: 'row', marginTop: 20 },
  resetButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  updateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
const mapStateToProps = store => {
  return {
    myInformation: store.AuthenticationReducers.myInformation,
    onLogin: store.AuthenticationReducers.onLogin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMyAccount: () => {
      dispatch(authenticationAction.getMyAccount());
    },
    updateMyAccount: (data) => {
      dispatch(authenticationAction.updateMyAccount(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
