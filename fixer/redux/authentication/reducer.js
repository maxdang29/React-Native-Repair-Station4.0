import * as typesAction from './actions/typesAction';

const init = {
  allStation: [],
  onLogin: false,
  stationInformation: {},
};

const AuthenticationReducers = (state = init, action) => {
  switch (action.type) {
    case typesAction.GET_ALL_STATION_SUCCESS:
      return {...state, allStation: action.data};
    case typesAction.LOGIN_SUCCESS:
      return {...state, onLogin: true};
    case typesAction.LOGOUT_SUCCESS:
      return {...state, onLogin: false};
    case typesAction.REGISTER_SUCCESS:
      return {...state};
    case typesAction.REGISTER_FAILED:
      return {...state};
    case typesAction.GET_STATION_SUCCESS:
      return {...state, stationInformation: action.data[0]};
    default:
      return {...state};
  }
};
export default AuthenticationReducers;
