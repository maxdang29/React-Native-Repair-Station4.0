import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as bookAction from './actions/actions';
import store from '../store';
import firebase from 'react-native-firebase';
import {eventChannel} from 'redux-saga';
import {showNotification} from '../../navigation/function';
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
    // #2: Return the shutdown method;
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
    // #4: Pause the task until the channel emits a signal and dispatch an action in the store;
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

const rootSagaBook = () => [
  takeLatest(typesAction.GET_ALL_BOOK, getAllBook),
  takeLatest(typesAction.ADD_SERVICE_TO_BOOK, addServiceToBook),
];
export default rootSagaBook();
