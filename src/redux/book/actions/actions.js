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
