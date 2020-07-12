import * as typesAction from './typesAction';

export const getAllOrder = stationId => {
  return {
    type: typesAction.GET_ALL_ORDER,
    stationId,
  };
};
export const getAllOrderSuccess = data => {
  return {
    type: typesAction.GET_ALL_ORDER_SUCCESS,
    data,
  };
};

export const addServiceToOrder = (data, orderId) => {
  return {
    type: typesAction.ADD_SERVICE_TO_ORDER,
    data,
    orderId,
  };
};

export const addServiceToOrderSuccess = () => {
  return {
    type: typesAction.ADD_SERVICE_TO_ORDER_SUCCESS,
  };
};
export const addServiceToOrderFailed = () => {
  return {
    type: typesAction.ADD_SERVICE_TO_ORDER_FAILED,
  };
};

export const confirmOrder = (orderId, componentId) => {
  return {
    type: typesAction.CONFIRM_ORDER,
    orderId,
    componentId,
  };
};
export const confirmOrderSuccess = () => {
  return {
    type: typesAction.CONFIRM_ORDER_SUCCESS,
  };
};
export const confirmOrderFailed = orderId => {
  return {
    type: typesAction.CONFIRM_ORDER,
  };
};

export const cancelConfirm = (orderId, componentId) => {
  return {
    type: typesAction.CANCEL_CONFIRM,
    orderId,
    componentId,
  };
};

export const cancelConfirmSuccess = () => {
  return {
    type: typesAction.CANCEL_CONFIRM_SUCCESS,
  };
};
export const cancelConfirmFailed = () => {
  return {
    type: typesAction.CANCEL_CONFIRM_FAILED,
  };
};

//CHANGE STATUS

export const updateStatus = (status, orderId, componentId) => {
  console.log('component id', componentId);
  return {
    type: typesAction.CHANGE_STATUS,
    orderId,
    status,
    componentId
  };
};
export const updateStatusSuccess = (data) => {
  return {
    type: typesAction.CHANGE_STATUS_SUCCESS,
    data
  };
};

export const updateStatusFailed = error => {
  return {
    type: typesAction.CHANGE_STATUS,
    error,
  };
};
