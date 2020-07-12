import {put, takeLatest, call, all, take} from 'redux-saga/effects';
import * as typesAction from './actions/typesAction';
import * as orderAction from './actions/actions';
import store from '../store';
import {showNotification, showModalNavigation} from '../../navigation/function';
import {Navigation} from 'react-native-navigation';
import {getAllOrderApi, updateStatusApi} from '../../api/order';
import {AsyncStorage} from 'react-native';
import {WAITING} from '../../constants/orderStatus';


function* getAllOrder(actions) {
  try {
    const token = yield AsyncStorage.getItem('token');
    const response = yield call(getAllOrderApi, actions.stationId, token);
    yield put(orderAction.getAllOrderSuccess(response.data));

    const newOrder = yield response.data.sources.filter(element => {
      return element.status === WAITING;
    });
    // console.log('response111111111111',newOrder);

    if (newOrder.length > 0) {
      yield showModalNavigation('notificationNewOrder', newOrder, 'Bạn có cuốc mới');
    }
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
    var allOrder = yield store.getState().OrderReducers.dataOrder;
    let index = yield allOrder.findIndex(order => {
      return order.id === actions.orderId;
    });
    allOrder[index].status = response.data.status;
    yield put(orderAction.updateStatusSuccess([...allOrder]));
    yield Navigation.dismissModal(actions.componentId);
  } catch (error) {
    console.log('get order error', error);
  }
}

function* addServiceToOrder(actions) {
  try {
    let response = yield call(
      setDataRequest,
      'orders/' + actions.orderId + '/services/',
      actions.data,
    );
    yield put(orderAction.addServiceToOrderSuccess());
  } catch (error) {
    console.log('error add service', error);
    yield showNotification(
      'showNotification',
      'Thêm dịch vụ không thành công',
      'error',
    );

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
  takeLatest(typesAction.ADD_SERVICE_TO_ORDER, addServiceToOrder),
  takeLatest(typesAction.CONFIRM_ORDER, confirmOrder),
  takeLatest(typesAction.CANCEL_CONFIRM, cancelConfirm),
  takeLatest(typesAction.CHANGE_STATUS, updateStatus),
];
export default rootSagaOrder();
