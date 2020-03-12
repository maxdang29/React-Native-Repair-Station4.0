import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as serviceAction from './actions/actions';
import store from '../store';

import {showNotification} from '../../navigation/function';

import {Navigation} from 'react-native-navigation';
import firebase from 'react-native-firebase';
import {eventChannel} from 'redux-saga';

import {
  getDataByIdRequest,
  addDataRequest,
  deleteRequest,
  updateRequest,
} from '../../api/database';

function* getAllService(actions) {
  const channel = new eventChannel(data => {
    let listener = getDataByIdRequest(
      {collection: 'services/', child: 'stationId/'},
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
    let listService = keys.map(function(k) {
      return data[k];
    });
    // #4: Pause the task until the channel emits a signal and dispatch an action in the store;
    yield put(serviceAction.getAllServiceSuccess([...listService]));
  }
}

function* addService(actions) {
  try {
    let response = yield call(addDataRequest, 'services/', actions.data);
    yield put(serviceAction.addServiceSuccess());
    yield showNotification(
      'showNotification',
      'Thêm dịch vụ thành công',
      'success',
    );
    yield Navigation.dismissModal(actions.componentId);
  } catch (error) {
    console.log('error add service', error);
    yield showNotification(
      'showNotification',
      'Thêm dịch vụ không thành công',
      'error',
    );

    yield put(serviceAction.addServiceFailed(error));
  }
}

function* deleteService(actions) {
  try {
    let response = yield call(deleteRequest, 'services/', actions.data);
    yield put(serviceAction.deleteServiceSuccess());
    yield showNotification(
      'showNotification',
      'Xóa dịch vụ thành công',
      'success',
    );
  } catch (error) {
    yield showNotification(
      'showNotification',
      'Xóa dịch vụ không thành công',
      'error',
    );

    console.log('error delete service', error);
    yield put(serviceAction.deleteServiceFailed(error));
  }
}

function* updateService(actions) {
  try {
    let response = yield call(updateRequest, 'services/', actions.data);
    yield put(serviceAction.updateServiceSuccess());
    yield Navigation.dismissModal(actions.componentId);
    yield showNotification(
      'showNotification',
      'Cập nhật dịch vụ thành công',
      'success',
    );
  } catch (error) {
    yield showNotification(
      'showNotification',
      'Cập nhật dịch vụ không thành công',
      'error',
    );

    console.log('error update service', error);
    yield put(serviceAction.updateServiceFailed(error));
  }
}

const rootSagaService = () => [
  takeLatest(typesAction.GET_ALL_SERVICE, getAllService),
  takeLatest(typesAction.ADD_SERVICE, addService),
  takeLatest(typesAction.DELETE_SERVICE, deleteService),
  takeLatest(typesAction.UPDATE_SERVICE, updateService),
];
export default rootSagaService();
