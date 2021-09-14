import {all,call} from 'redux-saga/effects';

import {authSagas} from './auth/auth-saga';
import {userSagas} from './user/user-saga';
import {adminSagas} from './admin/admin-saga';
import {coreSagas} from './core/core-saga';


export default function* rootSagas(){
    yield all([
      call(authSagas),
      call(userSagas),
      call(adminSagas),
      call(coreSagas)
    ])
}