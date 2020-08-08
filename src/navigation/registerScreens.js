import { Navigation } from 'react-native-navigation';
import React from 'react';
import store from '../redux/store';
import { Provider } from 'react-redux';
import SplashScreen from '../screens/splashScreen';
import homeFixer from '../screens/home/home';
import serviceFixer from '../screens/services/services';
import FormService from '../screens/services/formService';
import showNotification from '../components/notifications/showNotification';
import serviceSetting from '../screens/services/serviceSetting';
import login from '../screens/authentication/login';
import register from '../screens/authentication/register';
import profileUser from '../screens/authentication/profileUser';
import profileStation from '../screens/authentication/profileStation';
import searchStation from '../screens/authentication/searchStation';
import orderMain from '../screens/order/orderMain';
import orderDetail from '../screens/order/orderDetail';
import alertConfirm from '../components/alertConfirm';
import notificationNewOrder from '../screens/order/notificationNewOrder';
import sideBar from './sideBar';
import RegisterStation from '../screens/authentication/registerStation';
import notification from '../screens/notification/main';
import RevenueStatistics from '../screens/home/revenueStatistics';

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
    'profileStation',
    () => ReduxProvider(profileStation),
    () => profileStation,
  );
  Navigation.registerComponent(
    'searchStation',
    () => ReduxProvider(searchStation),
    () => searchStation,
  );

  Navigation.registerComponent(
    'orderMain',
    () => ReduxProvider(orderMain),
    () => orderMain,
  );

  Navigation.registerComponent(
    'orderDetail',
    () => ReduxProvider(orderDetail),
    () => orderDetail,
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

  Navigation.registerComponent(
    'registerStation',
    () => ReduxProvider(RegisterStation),
    () => RegisterStation,
  );

  Navigation.registerComponent(
    'splashScreen',
    () => ReduxProvider(SplashScreen),
    () => SplashScreen,
  );
  Navigation.registerComponent(
    'formService',
    () => ReduxProvider(FormService),
    () => FormService,
  );
  Navigation.registerComponent(
    'notification',
    () => ReduxProvider(notification),
    () => notification,
  );

  Navigation.registerComponent(
    'revenueStatistics',
    () => ReduxProvider(RevenueStatistics),
    () => RevenueStatistics,
  );
}
