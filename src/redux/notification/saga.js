import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as notificationAction from './actions/actions';
import store from '../store';
import {showNotification, showModalNavigation} from '../../navigation/function';
import {Navigation} from 'react-native-navigation';
import {getAllNotificationApi} from '../../api/notification';
import {AsyncStorage} from 'react-native';
import {WAITING} from '../../constants/orderStatus';

function* getAllNotification(actions) {
  try {
    const token = yield AsyncStorage.getItem('token');
    const limit = 10;
    const response = yield call(
      getAllNotificationApi,
      token,
      actions.pageIndex,
      limit,
    );
    let notifications = store.getState().NotificationReducers.notifications;
    if (actions.pageIndex > 1) {
      notifications = notifications.concat(response.data.sources);
    } else {
      notifications = response.data.sources;
    }

    console.log('data 111111111', JSON.stringify(notifications, null, 4));

    yield put(
      notificationAction.getAllNotificationSuccess(
        notifications,
        response.data.pageIndex,
      ),
    );
  } catch (error) {
    console.log('errror notification', JSON.stringify(error, null, 4));
  }
}

const rootSagaNotification = () => [
  takeLatest(typesAction.GET_ALL_NOTIFICATION, getAllNotification),
];
export default rootSagaNotification();
