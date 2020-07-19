import callApi from './apiCaller';
export const getAllOrderApi = (stationId, token, pageIndex) => {
  return callApi(
    'api/orders/stations/' + stationId,
    'GET',
    null,
    token,
    pageIndex,
  );
};

export const getOrderByIdApi = (orderId, token) => {
  return callApi('api/orders/' + orderId, 'GET', null, token);
};

export const updateStatusApi = (orderId, status, token) => {
  return callApi('api/orders/' + orderId, 'PUT', status, token);
};
export const updateServicesApi = (orderId, data, token) => {
  return callApi('api/orders/' + orderId, 'PUT', data, token);
};
