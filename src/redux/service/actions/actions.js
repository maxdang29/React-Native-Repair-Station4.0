import * as types from './typesAction';

//add service
export const addService = (data, componentId) => {
  return {
    type: types.ADD_SERVICE,
    data,
    componentId,
  };
};

export const addServiceSuccess = data => {
  return {
    type: types.ADD_SERVICE_SUCCESS,
    data,
  };
};
export const addServiceFailed = error => {
  return {
    type: types.ADD_SERVICE_FAILED,
  };
};

// delete service

export const deleteService = (serviceId, componentId) => {
  return {
    type: types.DELETE_SERVICE,
    serviceId,
    componentId,
  };
};
export const deleteServiceSuccess = data => {
  return {
    type: types.DELETE_SERVICE_SUCCESS,
    data,
  };
};
export const deleteServiceFailed = error => {
  return {
    type: types.DELETE_SERVICE_FAILED,
    error,
  };
};

//update service

export const updateService = (data, serviceId, componentId) => {
  return {
    type: types.UPDATE_SERVICE,
    data,
    serviceId,
    componentId,
  };
};

export const updateServiceSuccess = data => {
  return {
    type: types.UPDATE_SERVICE_SUCCESS,
    data,
  };
};

export const updateServiceFailed = error => {
  return {
    type: types.UPDATE_SERVICE_FAILED,
    error,
  };
};
