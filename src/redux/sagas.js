import {all} from 'redux-saga/effects';

import rootSagaService from './service/saga';
import rootSagaAuthentication from './authentication/saga';
import rootSagaOrder from './order/saga';
import rootSagaStation from './station/saga';
import rootSagaNotification from './notification/saga';

export default function* root() {
  yield all([
    ...rootSagaService,
    ...rootSagaAuthentication,
    ...rootSagaOrder,
    ...rootSagaStation,
    ...rootSagaNotification,
  ]);
}
