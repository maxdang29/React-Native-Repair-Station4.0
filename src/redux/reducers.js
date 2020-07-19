import {combineReducers} from 'redux';

import ServiceReducers from './service/reducer';
import AuthenticationReducers from './authentication/reducer';
import OrderReducers from './order/reducer';
import StationReducers from './station/reducer';
import NotificationReducers from './notification/reducer';
const rootReducer = combineReducers({
  ServiceReducers,
  AuthenticationReducers,
  OrderReducers,
  StationReducers,
  NotificationReducers,
});
export default rootReducer;
