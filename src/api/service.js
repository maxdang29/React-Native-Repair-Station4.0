import callApi from './apiCaller';

export const addServiceApi = (data, token) => {
  return callApi('api/services', 'POST', data, token);
};
export const deleteServiceApi = (serviceId, token) => {
  return callApi('api/services/' + serviceId, 'DELETE', null, token);
};
export const updateServiceApi = (serviceId, data, token) => {
  return callApi('api/services/' + serviceId, 'PUT', data, token);
};
