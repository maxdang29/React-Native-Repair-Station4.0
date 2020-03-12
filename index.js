import {Navigation} from 'react-native-navigation';

import startApp from './src/navigation/bottomTab';
import {setRoot} from './src/navigation/function';
import firebase from 'react-native-firebase';
import {registerScreens} from './src/navigation/registerScreens';
import {AsyncStorage} from 'react-native';
registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  const stationData = await AsyncStorage.getItem('tokenDevice');
  if (stationData) {
    startApp();
  } else {
    setRoot('login');
  }
});
