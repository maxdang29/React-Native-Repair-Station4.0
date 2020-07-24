import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as notificationAction from './actions/actions';
import store from '../store';
import {showNotification, showModalNavigation} from '../../navigation/function';
import {Navigation} from 'react-native-navigation';
import {getAllNotificationApi, getNotifyByIdApi} from '../../api/notification';
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

    yield put(
      notificationAction.getAllNotificationSuccess(
        notifications,
        response.data.pageIndex,
      ),
    );
  } catch (error) {
    console.log('error notification', JSON.stringify(error, null, 4));
  }
}

function* getNotifyById(actions) {
  try {
    const token = yield AsyncStorage.getItem('token');
    const response = yield call(getNotifyByIdApi, actions.notifyId, token);

    let allNotify = yield store.getState().NotificationReducers.notifications;
    let index = yield allNotify.findIndex(notify => {
      return notify.id === actions.notifyId;
    });

    allNotify[index].isSeen = response.data.isSeen;
    yield put(notificationAction.seenNotifySuccess([...allNotify], response.data.order));
  } catch (error) {
    console.log('error notification', JSON.stringify(error, null, 4));
  }
}

const rootSagaNotification = () => [
  takeLatest(typesAction.GET_ALL_NOTIFICATION, getAllNotification),
  takeLatest(typesAction.SEEN_NOTIFY, getNotifyById),
];
export default rootSagaNotification();
