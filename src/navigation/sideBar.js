import React, {component, Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon, Header, ListItem} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {APP_COLOR} from '../utils/colors';
import * as authenticationAction from '../redux/authentication/actions/actions';
import {showModalNavigation} from '../navigation/function';
class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  handleCloseSideMenu = () => {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
  };
  handleOpenProfile = () => {
    this.handleCloseSideMenu();
    showModalNavigation('profileUser', null, 'Trang cá nhân', true);
  };
  render() {
    const {user} = this.props;
    // console.log('user', JSON.stringify(user, null, 4));

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: user.name.toUpperCase() || '',
            style: {color: '#fff', fontSize: 18, marginHorizontal: -30},
          }}
          rightComponent={
            <Icon
              type="EvilIcons"
              name="close"
              color={
                APP_COLOR === '#ffffff' || APP_COLOR === '#fff'
                  ? 'black'
                  : 'white'
              }
              onPress={this.handleCloseSideMenu}
            />
          }
          backgroundColor={APP_COLOR}
          containerStyle={{paddingTop: 0, paddingHorizontal: 18, height: 60}}
        />
        <View>
          <ListItem
            leftIcon={<Icon type="feather" name="user" />}
            title="Trang cá nhân"
            onPress={this.handleOpenProfile}
            bottomDivider
          />
          <ListItem
            leftIcon={<Icon type="feather" name="list" />}
            title="Lịch sử cuốc xe"
            onPress={this.handleOpenOrderHistory}
            bottomDivider
          />
          <ListItem
            leftIcon={<Icon type="feather" name="settings" />}
            title="Cài đặt"
            onPress={this.handleOpenSettings}
            bottomDivider
          />
          <ListItem
            leftIcon={<Icon type="feather" name="log-out" />}
            title="Đăng xuất"
            onPress={this.props.onLogout}
            bottomDivider
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});
const mapStateToProps = store => {
  return {
    user: store.AuthenticationReducers.myInformation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(authenticationAction.logOut());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
