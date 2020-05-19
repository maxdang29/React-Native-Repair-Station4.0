import * as typesAction from './typesAction';

export const getAllBook = () => {
  return {
    type: typesAction.GET_ALL_BOOK,
  };
};
export const getAllBookSuccess = data => {
  return {
    type: typesAction.GET_ALL_BOOK_SUCCESS,
    data,
  };
};

export const addServiceToBook = (data, bookId) => {
  return {
    type: typesAction.ADD_SERVICE_TO_BOOK,
    data,
    bookId,
  };
};

export const addServiceToBookSuccess = () => {
  return {
    type: typesAction.ADD_SERVICE_TO_BOOK_SUCCESS,
  };
};
export const addServiceToBookFailed = () => {
  return {
    type: typesAction.ADD_SERVICE_TO_BOOK_FAILED,
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
