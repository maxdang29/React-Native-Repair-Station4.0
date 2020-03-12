import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as authenticationAction from './actions/actions';
import {showNotification, setRoot} from '../../navigation/function';
import {logOutRequest, registerRequest} from '../../api/authentication';

import {
  setDataRequest,
  getAllDataRequest,
  getDataByIdRequest,
  addDataRequest,
} from '../../api/database';
import {eventChannel} from 'redux-saga';
import {Navigation} from 'react-native-navigation';
import {AsyncStorage} from 'react-native';

function* login(actions) {
  try {
    const response = yield call(
      setDataRequest,
      'stations/' + actions.stationId + '/tokenDevice/',
      actions.tokenDevice,
    );
    yield put(authenticationAction.loginSuccess());
    yield AsyncStorage.setItem(
      'tokenDevice',
      JSON.stringify(actions.tokenDevice),
    );
  } catch (error) {
    console.log('error saga', error);
    yield showNotification(
      'showNotification',
      'Không thể đăng nhập! \n' + error,
      'error',
    );

    yield put(authenticationAction.loginFailed(error));
  }
}
function* getAllStation(actions) {
  const channel = new eventChannel(data => {
    let listener = getAllDataRequest('stations/', data);
    // #2: Return the shutdown method;
    return () => {
      listener.off();
    };
  });
  while (true) {
    const {data} = yield take(channel);
    let keys = Object.keys(data);
    let stations = keys.map(function(k) {
      data[k].id = k;
      return data[k];
    });
    // #4: Pause the task until the channel emits a signal and dispatch an action in the store;
    yield put(authenticationAction.getAllStationSuccess([...stations]));
  }
}

function* logOut(actions) {
  try {
    const response = yield call(
      setDataRequest,
      'stations/' + actions.stationId + '/tokenDevice/',
      null,
    );
    yield AsyncStorage.clear();
    yield put(authenticationAction.logOutSuccess());
    yield setRoot('login');
  } catch (error) {
    console.log('error', error);
    yield put(authenticationAction.logOutFailed());
  }
}

function* register(actions) {
  try {
    const response = yield call(addDataRequest, 'stations/', actions.data);
    yield put(authenticationAction.registerSuccess());
    yield showNotification(
      'showNotification',
      'Đăng kí thành công, Tiến hành đăng nhập',
      'success',
    );
    yield Navigation.dismissModal(actions.componentId);
  } catch (error) {
    console.log('error', error);
    yield showNotification(
      'showNotification',
      'Đăng kí không thành công!' + error + '',
      'error',
    );
    yield put(authenticationAction.registerFailed(error));
  }
}

function* getStationById(actions) {
  const channel = new eventChannel(data => {
    let listener = getDataByIdRequest(
      {collection: 'stations/', child: 'id/'},
      data,
    );
    return () => {
      listener.off();
    };
  });
  while (true) {
    const {data} = yield take(channel);
    let keys = Object.keys(data);
    let stations = keys.map(function(k) {
      //   data[k].id = k;
      return data[k];
    });
    yield put(authenticationAction.getStationByIdSuccess([...stations]));
  }
}
function* changePower(actions) {
  const response = yield call(
    setDataRequest,
    'stations/' + actions.stationKey + '/hasAmbulatory',
    actions.status,
  );
}

const rootSagaAuthentication = () => [
  takeLatest(typesAction.LOGIN, login),
  takeLatest(typesAction.GET_ALL_STATION, getAllStation),
  takeLatest(typesAction.LOGOUT, logOut),
  takeLatest(typesAction.REGISTER, register),
  takeLatest(typesAction.GET_STATION, getStationById),
  takeLatest(typesAction.CHANGE_POWER, changePower),
];
export default rootSagaAuthentication();
