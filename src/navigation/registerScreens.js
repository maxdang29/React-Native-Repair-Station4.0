import {Navigation} from 'react-native-navigation';
import React from 'react';
import store from '../redux/store';
import {Provider} from 'react-redux';
import homeFixer from '../screens/home/home';
import serviceFixer from '../screens/services/services';
import FormService from '../screens/services/formService';
import showNotification from '../components/notifications/showNotification';
import serviceSetting from '../screens/services/serviceSetting';
import login from '../screens/authentication/login';
import register from '../screens/authentication/register';
import profileUser from '../screens/authentication/profileUser';
import bookMain from '../screens/book/bookMain';
import bookDetail from '../screens/book/bookDetail';
import alertConfirm from '../components/alertConfirm';
import notificationNewOrder from '../screens/book/notificationNewOrder';
import sideBar from './sideBar';
console.disableYellowBox = true;

function ReduxProvider(Component) {
  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export function registerScreens() {
  Navigation.registerComponent(
    'homeFixer',
    () => ReduxProvider(homeFixer),
    () => homeFixer,
  );

  Navigation.registerComponent(
    'serviceFixer',
    () => ReduxProvider(serviceFixer),
    () => serviceFixer,
  );

  Navigation.registerComponent(
    'FormService',
    () => ReduxProvider(FormService),
    () => FormService,
  );

  Navigation.registerComponent(
    'serviceSetting',
    () => ReduxProvider(serviceSetting),
    () => serviceSetting,
  );

  Navigation.registerComponent(
    'showNotification',
    () => ReduxProvider(showNotification),
    () => showNotification,
  );
  Navigation.registerComponent(
    'login',
    () => ReduxProvider(login),
    () => login,
  );
  Navigation.registerComponent(
    'register',
    () => ReduxProvider(register),
    () => register,
  );
  Navigation.registerComponent(
    'profileUser',
    () => ReduxProvider(profileUser),
    () => profileUser,
  );

  Navigation.registerComponent(
    'bookMain',
    () => ReduxProvider(bookMain),
    () => bookMain,
  );

  Navigation.registerComponent(
    'bookDetail',
    () => ReduxProvider(bookDetail),
    () => bookDetail,
  );
  Navigation.registerComponent(
    'alertConfirm',
    () => ReduxProvider(alertConfirm),
    () => alertConfirm,
  );
  Navigation.registerComponent(
    'notificationNewOrder',
    () => ReduxProvider(notificationNewOrder),
    () => notificationNewOrder,
  );

  Navigation.registerComponent(
    'sideBar',
    () => ReduxProvider(sideBar),
    () => sideBar,
  );
}
