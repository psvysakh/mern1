import {all,call} from 'redux-saga/effects';

import {authSagas} from './auth/auth-saga';
import {userSagas} from './user/user-saga';

export default function* rootSagas(){
    yield all([
      call(authSagas),
      call(userSagas)
    ])
}