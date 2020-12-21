import {takeLatest,put,all,call} from 'redux-saga/effects';
import { getDashboardSuccess } from './user.action';
import axios from 'axios';
/* import api from '../../helper/api'; */
import userActionType from './user.type';





//apicalls <--(level-3) below
const secretFetch=async()=>{
    /* return await fetch('http://localhost:8001/user/secret',{
    method:'GET',
    headers:{
        Authorization:localStorage.getItem('JWT_TOKEN'),
        "Content-Type":"application/json"
            }
    })
    .then(res=>{
        console.log(`response received`,res);
        return res.json()
    })
    .then(error=>{return error}); */

    return await axios.get('/user/secret')
    .then(res=>{
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}

//userActionListeners <--(level-1) below
export function* secret(){
    try{
        const data = yield call(secretFetch);
        console.log(`user receicved`,data)
        yield put(getDashboardSuccess(data))
    }catch(error){
        console.log(error);
    }
}
//triggred by (level) <--(level-1) below
export function* fetchSecret(){
    yield takeLatest(userActionType.DASH_GET_START,
        secret)
}
//userActionListeners <--(level-1) below
export function* userSagas(){
    yield all([
        call(fetchSecret)
    ])
}