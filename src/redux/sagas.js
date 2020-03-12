import {all} from 'redux-saga/effects';

import rootSagaService from './service/saga';
import rootSagaAuthentication from './authentication/saga';
import rootSagaBook from './book/saga';

export default function* root() {
  yield all([...rootSagaService, ...rootSagaAuthentication, ...rootSagaBook]);
}
