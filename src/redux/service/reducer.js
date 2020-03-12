import * as typesAction from './actions/typesAction';
import {act} from 'react-test-renderer';

const init = {
  services: [],
  loading: false,
};

const ServiceReducers = (state = init, action) => {
  switch (action.type) {
    case typesAction.GET_ALL_SERVICE:
      return {...state, services: [], loading: true};
    case typesAction.GET_ALL_SERVICE_SUCCESS:
      return {...state, services: action.data, loading: false};
    case typesAction.ADD_SERVICE:
      return {...state};
    case typesAction.ADD_SERVICE_SUCCESS:
      return {...state};
    case typesAction.ADD_SERVICE_FAILED:
      return {...state};
    case typesAction.DELETE_SERVICE_SUCCESS:
      return {...state};

    case typesAction.UPDATE_SERVICE_SUCCESS:
      return {...state};
    default:
      return {...state};
  }
};
export default ServiceReducers;
