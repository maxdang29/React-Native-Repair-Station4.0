import callApi from './apiCaller';

export const loginApi = data => {
  return callApi('api/account/login', 'POST', data);
};
export const registerApi = data => {
  return callApi('api/account/register', 'POST', data);
};
export const updateApi = (data, token) => {
  return callApi('api/account/me', 'PUT', data, token);
};
export const getMyAccountApi = token => {
  return callApi('api/account/me', 'GET', null, token);
};