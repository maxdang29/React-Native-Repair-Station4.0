import * as typesAction from './actions/typesAction';

const init = {
  dataOrder: [],
  loading: false,
  order: null,
  pageIndex: 1,
  orderRevenue: null,
  ordersCurrentMonth: []
};

const OrderReducers = (state = init, action) => {
  switch (action.type) {
    case typesAction.GET_ALL_ORDER:
      return {...state, loading: true};
    case typesAction.GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        dataOrder: [...action.data],
        loading: false,
        pageIndex: action.pageIndex,
      };
    case typesAction.GET_ALL_ORDER_FAILED:
      return {...state, loading: false};
    case typesAction.GET_ORDER_BY_ID:
      return {...state, loading: true};
    case typesAction.GET_ORDER_BY_ID_SUCCESS:
      return {...state, order: action.data, loading: false};
    case typesAction.GET_ORDER_BY_ID_FAILED:
      return {...state, loading: false};
    case typesAction.ADD_SERVICE_TO_ORDER:
      return {...state, loading: true};
    case typesAction.ADD_SERVICE_TO_ORDER_SUCCESS:
      return {...state, loading: false, order: action.data};
    case typesAction.ADD_SERVICE_TO_ORDER_FAILED:
      return {...state, loading: false};
    case typesAction.CHANGE_STATUS:
      return {...state};
    case typesAction.CHANGE_STATUS_SUCCESS:
      return {...state, dataOrder: action.data, order: action.currentOrder};
    case typesAction.CHANGE_STATUS_FAILED:
      return {...state};
    case typesAction.GET_REVENUE_YEAR_SUCCESS:
      return {...state, orderRevenue: action.data};
    case typesAction.GET_ORDER_CURRENT_MONTH_SUCCESS:
      return {...state, ordersCurrentMonth: action.data};
    default:
      return {...state};
  }
};
export default OrderReducers;
