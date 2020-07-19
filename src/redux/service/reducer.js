import * as typesAction from './actions/typesAction';
import * as stationTypeAction from '../station/actions/typesAction';
import services from '../../screens/services/services';

const init = {
  services: [],
  loading: false,
};

const ServiceReducers = (state = init, action) => {
  switch (action.type) {
    case stationTypeAction.GET_STATION_BY_ID_SUCCESS:
      return {...state, services: action.data.services};
    case typesAction.ADD_SERVICE:
      return {...state};
    case typesAction.ADD_SERVICE_SUCCESS:
      return {...state, services: [...action.data]};
    case typesAction.ADD_SERVICE_FAILED:
      return {...state};
    case typesAction.DELETE_SERVICE_SUCCESS:
      return {...state, services: [...action.data]};
    case typesAction.UPDATE_SERVICE_SUCCESS:
      return {...state, services: [...action.data]};
    default:
      return {...state};
  }
};
export default ServiceReducers;
