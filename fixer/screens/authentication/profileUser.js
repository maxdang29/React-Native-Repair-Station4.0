import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import * as authenticationAction from '../../redux/authentication/actions/actions';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {stationInformation} = this.props;
    return (
      <View style={styles.container}>
        <Text>Ten cua hang: {stationInformation.nameStore}</Text>
        <TouchableOpacity
          style={styles.buttonLogOut}
          onPress={() => this.props.logOut(stationInformation.id)}>
          <Text>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogOut: {
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 30,
  },
});
const mapStateToProps = store => {
  return {
    stationInformation: store.AuthenticationReducers.stationInformation,
    onLogin: store.AuthenticationReducers.onLogin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: stationId => {
      dispatch(authenticationAction.logOut(stationId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
