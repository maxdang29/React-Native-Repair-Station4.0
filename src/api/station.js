import callApi from './apiCaller';
import {getStationById} from '../redux/station/actions/actions';

export const registerStationApi = (data, token) => {
  return callApi('api/stations', 'POST', data, token);
};
export const getStationByIdApi = (id, token) => {
  return callApi('api/stations/' + id, 'GET', null, token);
};
export const getMyStationApi = token => {
  return callApi('api/stations/me', 'GET', null, token);
};
export const changePowerApi = (id, data, token) => {
  return callApi('api/stations/' + id, 'PUT', data, token);
};
