import * as typesAction from './actions/typesAction';

const init = {
  dataBook: [],
  loading: false,
};

const BookReducers = (state = init, action) => {
  switch (action.type) {
    case typesAction.GET_ALL_BOOK:
      return {...state, loading: true};
    case typesAction.GET_ALL_BOOK_SUCCESS:
      return {...state, dataBook: action.data, loading: false};
    case typesAction.ADD_SERVICE_TO_BOOK_SUCCESS:
      return {...state};

    default:
      return {...state};
  }
};
export default BookReducers;
