import * as typesAction from './typesAction';
export const login = (stationId, tokenDevice) => {
  return {
    type: typesAction.LOGIN,
    tokenDevice,
    stationId,
  };
};

export const loginSuccess = () => {
  return {
    type: typesAction.LOGIN_SUCCESS,
  };
};

export const loginFailed = error => {
  return {
    type: typesAction.LOGIN_SUCCESS,
    error,
  };
};

//GET ALL STATION
export const getAllStation = () => {
  return {
    type: typesAction.GET_ALL_STATION,
  };
};
export const getAllStationSuccess = data => {
  return {
    type: typesAction.GET_ALL_STATION_SUCCESS,
    data,
  };
};
export const getAllStationFailed = () => {
  return {
    type: typesAction.GET_ALL_STATION_FAILED,
  };
};

//LOGOUT

export const logOut = stationId => {
  return {
    type: typesAction.LOGOUT,
    stationId,
  };
};
export const logOutSuccess = () => {
  return {
    type: typesAction.LOGOUT_SUCCESS,
  };
};
export const logOutFailed = () => {
  return {
    type: typesAction.LOGOUT_FAILED,
  };
};
//register
export const register = (data, componentId) => {
  return {
    type: typesAction.REGISTER,
    data,
    componentId,
  };
};
export const registerSuccess = () => {
  return {
    type: typesAction.REGISTER_SUCCESS,
  };
};
export const registerFailed = () => {
  return {
    type: typesAction.REGISTER_FAILED,
  };
};

//GET DATA STATION INFORMATION

export const getStationById = () => {
  return {
    type: typesAction.GET_STATION,
  };
};
export const getStationByIdSuccess = data => {
  return {
    type: typesAction.GET_STATION_SUCCESS,
    data,
  };
};

export const getStationByIdFailed = error => {
  return {
    type: typesAction.GET_STATION_FAILED,
    error,
  };
};

//CHANGE POWER

export const changePower = (stationKey, status) => {
  return {
    type: typesAction.CHANGE_POWER,
    stationKey,
    status,
  };
};
