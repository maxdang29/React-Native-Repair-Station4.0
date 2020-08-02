import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as orderAction from './actions/actions';
import store from '../store';
import {showNotification, showModalNavigation} from '../../navigation/function';
import {Navigation} from 'react-native-navigation';
import {
  getAllOrderApi,
  updateStatusApi,
  updateServicesApi,
  getOrderByIdApi,
} from '../../api/order';
import {AsyncStorage} from 'react-native';
import {WAITING} from '../../constants/orderStatus';

sortByDate = data => {
  data.sort(function(a, b) {
    let date1 = new Date(a.createdOn);
    let date2 = new Date(b.createdOn);
    return date1 < date2;
  });
};

function* getAllOrder(actions) {
  try {
    const token = yield AsyncStorage.getItem('token');
    const response = yield call(
      getAllOrderApi,
      actions.stationId,
      token,
      actions.pageIndex,
    );
    sortByDate(response.data.sources);

    let orders = store.getState().OrderReducers.dataOrder;
    if (actions.pageIndex > 1) {
      orders = response.data.sources.concat(orders);
    } else {
      orders = response.data.sources;
    }

    yield put(orderAction.getAllOrderSuccess(orders, response.data.pageIndex));

    const newOrder = yield response.data.sources.filter(element => {
      return element.status === WAITING;
    });

    if (newOrder.length > 0) {
      yield showModalNavigation(
        'notificationNewOrder',
        newOrder,
        'Bạn có cuốc mới',
      );
    }
  } catch (error) {
    console.log('errror 2222', JSON.stringify(error, null, 4));
  }
}

function* getOrderById(actions) {
  try {
    const token = yield AsyncStorage.getItem('token');
    const response = yield call(getOrderByIdApi, actions.orderId, token);
    yield put(orderAction.getOrderByIdSuccess(response.data));
  } catch (error) {
    console.log('get order error', error);
  }
}

function* updateStatus(actions) {
  try {
    const token = yield AsyncStorage.getItem('token');
    const response = yield call(
      updateStatusApi,
      actions.orderId,
      {status: actions.status},
      token,
    );
    let allOrder = yield store.getState().OrderReducers.dataOrder;
    let index = yield allOrder.findIndex(order => {
      return order.id === actions.orderId;
    });

    allOrder[index].status = response.data.status;
    yield put(orderAction.updateStatusSuccess([...allOrder], response.data));
    yield Navigation.dismissModal(actions.componentId);
  } catch (error) {
    console.log('get order error', error);
  }
}

function* addServiceToOrder(actions) {
  try {
    const token = yield AsyncStorage.getItem('token');
    let response = yield call(
      updateServicesApi,
      actions.orderId,
      actions.data,
      token,
    );
    yield put(orderAction.addServiceToOrderSuccess());
    yield showNotification(
      'showNotification',
      'Thêm dịch vụ thành công',
      'success',
    );
  } catch (error) {
    console.log('error add service', error);
    yield showNotification(
      'showNotification',
      'Thêm dịch vụ không thành công',
      'error',
    );
    console.log('errr 2222', JSON.stringify(error, null, 4));

    yield put(orderAction.addServiceToOrderFailed(error));
  }
}
function* confirmOrder(actions) {
  try {
    let response = yield call(
      setDataRequest,
      'orders/' + actions.orderId + '/status',
      'Đang sửa',
    );
    yield put(orderAction.confirmOrderSuccess());
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

    yield put(orderAction.confirmOrderFailed(error));
  }
}

function* cancelConfirm(actions) {
  try {
    let response = yield call(
      setDataRequest,
      'orders/' + actions.orderId + '/status',
      'Đã hủy',
    );
    yield put(orderAction.cancelConfirmSuccess());
    yield Navigation.dismissOverlay(actions.componentId);
    yield showNotification('showNotification', 'Đã hũy cuốc', 'success');
  } catch (error) {
    console.log('error cancel confirm order', error);
    yield showNotification(
      'showNotification',
      'Hủy cuốc không thành công',
      'error',
    );

    yield put(orderAction.cancelConfirmFailed(error));
  }
}

const rootSagaOrder = () => [
  takeLatest(typesAction.GET_ALL_ORDER, getAllOrder),
  takeLatest(typesAction.GET_ORDER_BY_ID, getOrderById),
  takeLatest(typesAction.ADD_SERVICE_TO_ORDER, addServiceToOrder),
  takeLatest(typesAction.CONFIRM_ORDER, confirmOrder),
  takeLatest(typesAction.CANCEL_CONFIRM, cancelConfirm),
  takeLatest(typesAction.CHANGE_STATUS, updateStatus),
];
export default rootSagaOrder();
