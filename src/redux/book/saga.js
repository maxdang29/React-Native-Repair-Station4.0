import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as bookAction from './actions/actions';
import store from '../store';
import firebase from 'react-native-firebase';
import {eventChannel} from 'redux-saga';
import {showNotification} from '../../navigation/function';
import {Navigation} from 'react-native-navigation';

import {
  getDataByIdRequest,
  setDataRequest,
  addDataRequest,
} from '../../api/database';
function* getAllBook() {
  const channel = new eventChannel(data => {
    let listener = getDataByIdRequest(
      {collection: 'books/', child: 'stationId/'},
      data,
    );
    return () => {
      listener.off();
    };
  });
  while (true) {
    const {data} = yield take(channel);
    let keys = Object.keys(data);
    let listBook = keys.map(function(k) {
      return data[k];
    });
    yield put(bookAction.getAllBookSuccess([...listBook]));
  }
}

function* addServiceToBook(actions) {
  try {
    let response = yield call(
      setDataRequest,
      'books/' + actions.bookId + '/services/',
      actions.data,
    );
    yield put(bookAction.addServiceToBookSuccess());
  } catch (error) {
    console.log('error add service', error);
    yield showNotification(
      'showNotification',
      'Thêm dịch vụ không thành công',
      'error',
    );

    yield put(bookAction.addServiceToBookFailed(error));
  }
}
function* confirmOrder(actions) {
  try {
    let response = yield call(
      setDataRequest,
      'books/' + actions.orderId + '/status',
      'Đang sửa',
    );
    yield put(bookAction.confirmOrderSuccess());
    yield Navigation.dismissOverlay(actions.componentId);
    yield showNotification(
      'showNotification',
      'Nhận cuốc thành công',
      'success',
    );
  } catch (error) {
    console.log('error confirm order', error);
    yield showNotification(
      'showNotification',
      'Nhận cuốc không thành công',
      'error',
    );

    yield put(bookAction.confirmOrderFailed(error));
  }
}

function* cancelConfirm(actions) {
  try {
    let response = yield call(
      setDataRequest,
      'books/' + actions.orderId + '/status',
      'Đã hủy',
    );
    yield put(bookAction.cancelConfirmSuccess());
    yield Navigation.dismissOverlay(actions.componentId);
    yield showNotification(
      'showNotification',
      'Đã hũy cuốc',
      'success',
    );
  } catch (error) {
    console.log('error cancel confirm order', error);
    yield showNotification(
      'showNotification',
      'Hủy cuốc không thành công',
      'error',
    );

    yield put(bookAction.cancelConfirmFailed(error));
  }
}

const rootSagaBook = () => [
  takeLatest(typesAction.GET_ALL_BOOK, getAllBook),
  takeLatest(typesAction.ADD_SERVICE_TO_BOOK, addServiceToBook),
  takeLatest(typesAction.CONFIRM_ORDER, confirmOrder),
  takeLatest(typesAction.CANCEL_CONFIRM, cancelConfirm),
];
export default rootSagaBook();
