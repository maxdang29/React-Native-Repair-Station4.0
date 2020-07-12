import * as typesAction from './actions/typesAction';

const init = {
  allStation: [],
  onLogin: false,
  myInformation: {},
  error: '',
};

const AuthenticationReducers = (state = init, action) => {
  switch (action.type) {
    case typesAction.GET_ALL_STATION_SUCCESS:
      return { ...state, allStation: action.data };
    case typesAction.LOGIN_SUCCESS:
      return { ...state, onLogin: true };
    case typesAction.LOGIN_FAILED:
      return { ...state, onLogin: false, error: action.error };
    case typesAction.LOGOUT_SUCCESS:
      return { ...state, onLogin: false };
    case typesAction.REGISTER_SUCCESS:
      return { ...state };
    case typesAction.REGISTER_FAILED:
      return { ...state, error: action.error };
    case typesAction.GET_MY_ACCOUNT_SUCCESS:
      return { ...state, myInformation: action.data };
    case typesAction.UPDATE_MY_ACCOUNT_SUCCESS:
      return { ...state, myInformation: action.data };
    default:
      return { ...state };
  }
};
export default AuthenticationReducers;
