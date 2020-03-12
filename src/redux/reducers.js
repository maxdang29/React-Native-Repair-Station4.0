import {combineReducers} from 'redux';

import ServiceReducers from './service/reducer';
import AuthenticationReducers from './authentication/reducer';
import BookReducers from './book/reducer';
const rootReducer = combineReducers({
  ServiceReducers,
  AuthenticationReducers,
  BookReducers,
});
export default rootReducer;
