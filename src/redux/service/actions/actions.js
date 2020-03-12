import * as types from './typesAction';

export const getAllService = () => {
  return {
    type: types.GET_ALL_SERVICE,
  };
};
export const getAllServiceSuccess = data => {
  return {
    type: types.GET_ALL_SERVICE_SUCCESS,
    data,
  };
};
export const getAllServiceFailed = error => {
  return {
    type: types.GET_ALL_SERVICE_FAILED,
    error,
  };
};

//add service
export const addService = (data, componentId) => {
  return {
    type: types.ADD_SERVICE,
    data,
    componentId,
  };
};

export const addServiceSuccess = () => {
  return {
    type: types.ADD_SERVICE_SUCCESS,
  };
};
export const addServiceFailed = error => {
  return {
    type: types.ADD_SERVICE_FAILED,
  };
};

// delete service

export const deleteService = data => {
  return {
    type: types.DELETE_SERVICE,
    data,
  };
};
export const deleteServiceSuccess = () => {
  return {
    type: types.DELETE_SERVICE_SUCCESS,
  };
};
export const deleteServiceFailed = error => {
  return {
    type: types.DELETE_SERVICE_FAILED,
    error,
  };
};

//update service

export const updateService = (data, componentId) => {
  return {
    type: types.UPDATE_SERVICE,
    data,
    componentId,
  };
};

export const updateServiceSuccess = () => {
  return {
    type: types.UPDATE_SERVICE_SUCCESS,
  };
};

export const updateServiceFailed = error => {
  return {
    type: types.UPDATE_SERVICE_FAILED,
    error,
  };
};
