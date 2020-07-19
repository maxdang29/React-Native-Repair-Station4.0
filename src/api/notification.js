import callApi from './apiCaller';
export const getAllNotificationApi = (token, pageIndex, limit) => {
  return callApi('api/notifications/', 'GET', null, token, pageIndex, limit);
};
