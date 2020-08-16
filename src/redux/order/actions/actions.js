import * as typesAction from './typesAction';

export const getAllOrder = (stationId, pageIndex, dateFrom, dateTo) => {
  return {
    type: typesAction.GET_ALL_ORDER,
    stationId,
    pageIndex,
    dateFrom,
    dateTo
  };
};
export const getAllOrderSuccess = (data, pageIndex) => {
  return {
    type: typesAction.GET_ALL_ORDER_SUCCESS,
    data,
    pageIndex,
  };
};

export const addServiceToOrder = (data, orderId) => {
  return {
    type: typesAction.ADD_SERVICE_TO_ORDER,
    data,
    orderId,
  };
};

export const getOrdersCurrentMonth = (stationId, pageIndex, dateFrom, dateTo) => {
  return {
    type: typesAction.GET_ORDER_CURRENT_MONTH,
    stationId,
    pageIndex,
    dateFrom,
    dateTo
  };
};

export const getOrdersCurrentMonthSuccess = (data) => {
  return {
    type: typesAction.GET_ORDER_CURRENT_MONTH_SUCCESS,
    data
  };
};

export const addServiceToOrderSuccess = (data) => {
  return {
    type: typesAction.ADD_SERVICE_TO_ORDER_SUCCESS,
    data
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
  return {
    type: typesAction.CHANGE_STATUS,
    orderId,
    status,
    componentId,
  };
};
export const updateStatusSuccess = (data, currentOrder) => {
  return {
    type: typesAction.CHANGE_STATUS_SUCCESS,
    data,
    currentOrder,
  };
};

export const updateStatusFailed = error => {
  return {
    type: typesAction.CHANGE_STATUS,
    error,
  };
};

// GET ORDER BY ID

export const getOrderById = orderId => {
  return {
    type: typesAction.GET_ORDER_BY_ID,
    orderId,
  };
};

export const getOrderByIdSuccess = data => {
  return {
    type: typesAction.GET_ORDER_BY_ID_SUCCESS,
    data,
  };
};

export const getOrderByIdFailed = error => {
  return {
    type: typesAction.GET_ORDER_BY_ID_FAILED,
    error,
  };
};


//revenue

export const getAllOrderRevenue = (stationId, pageIndex, dateFrom, dateTo) => {
  return {
    type: typesAction.GET_REVENUE_YEAR,
    stationId,
    pageIndex,
    dateFrom,
    dateTo
  };
};

export const getAllOrderRevenueSuccess = (data) => {
  return {
    type: typesAction.GET_REVENUE_YEAR_SUCCESS,
    data,
  };
};