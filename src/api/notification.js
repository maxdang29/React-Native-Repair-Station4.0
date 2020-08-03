import callApi from './apiCaller';
export const getAllNotificationApi = (token, pageIndex, limit) => {
  return callApi('api/notifications/', 'GET', null, token, pageIndex, limit);
};

export const getNotifyByIdApi = (notifyId, token) => {
  return callApi('api/notifications/' + notifyId, 'GET', null, token);
};
