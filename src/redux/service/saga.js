import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as serviceAction from './actions/actions';
import store from '../store';

import {showNotification} from '../../navigation/function';

import {Navigation} from 'react-native-navigation';
import {eventChannel} from 'redux-saga';
import {AsyncStorage} from 'react-native';
import {
  addServiceApi,
  deleteServiceApi,
  updateServiceApi,
} from '../../api/service';

function* addService(actions) {
  try {
    const token = yield AsyncStorage.getItem('token');
    let response = yield call(addServiceApi, actions.data, token);
    let allService = yield store.getState().ServiceReducers.services;
    yield allService.push(response.data);
    yield put(serviceAction.addServiceSuccess(allService));
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
    const token = yield AsyncStorage.getItem('token');
    let response = yield call(deleteServiceApi, actions.serviceId, token);
    let allService = yield store.getState().ServiceReducers.services;
    allService = yield allService.filter(service => {
      return service.id !== actions.serviceId;
    });
    yield put(serviceAction.deleteServiceSuccess(allService));
    yield Navigation.dismissModal(actions.componentId);

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
    const token = yield AsyncStorage.getItem('token');
    let response = yield call(
      updateServiceApi,
      actions.serviceId,
      actions.data,
      token,
    );
    let allService = yield store.getState().ServiceReducers.services;
    allService = yield allService.filter(service => {
      return service.id !== actions.serviceId;
    });
    yield allService.push(response.data);
    yield put(serviceAction.updateServiceSuccess(allService));
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
  takeLatest(typesAction.ADD_SERVICE, addService),
  takeLatest(typesAction.DELETE_SERVICE, deleteService),
  takeLatest(typesAction.UPDATE_SERVICE, updateService),
];
export default rootSagaService();
