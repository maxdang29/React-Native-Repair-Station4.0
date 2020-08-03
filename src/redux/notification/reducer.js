import * as typesAction from './actions/typesAction';

const init = {
  notifications: [],
  loading: false,
  pageIndex: 1,
  notify: null,
};

const NotificationReducers = (state = init, action) => {
  switch (action.type) {
    case typesAction.GET_ALL_NOTIFICATION:
      return {...state, loading: true};
    case typesAction.GET_ALL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [...action.data],
        loading: false,
        pageIndex: action.pageIndex,
      };
    case typesAction.GET_ALL_NOTIFICATION_FAILED:
      return {...state, loading: false};
    case typesAction.SEEN_NOTIFY_SUCCESS:
      return {...state, notifications: action.data, notify: action.itemNotify};
    default:
      return {...state};
  }
};
export default NotificationReducers;
