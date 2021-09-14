import {takeLatest,put,all,call} from 'redux-saga/effects';
import { getAddressFailure, 
    getDashboardSuccess, 
    setAddressFailure, 
    setAddressSuccess,
    getAddressSuccess,
    updateAddressFailure,
    getAddressStart,
    deleteAddressFailure,
    updateAddressSuccess
} from './user.action';
import axios from 'axios';
/* import api from '../../helper/api'; */
import userActionType from './user.type';





//apicalls <--(level-3) below
const getAddressFetch=async()=>{
    return await fetch('http://localhost:8001/user/address',{
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
        .then(error=>{return error});
    
    /* return await axios.get('/user/address')
    .then(res=>{
        return res.data;
    }).catch(err=>{
        return err.response.data;
    }) */
}
const deleteAddressFetch=async(addressId)=>{

    return await axios.delete(`/user/address/${addressId}`)
    .then(res=>{
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}
const updateAddressFetch=async(address)=>{

    return await axios.put('/user/address',
    address
    )
    .then(res=>{
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}
const setAddressFetch=async(data)=>{
    return await axios.post('/user/address',
    data
    )
    .then(res=>{
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}
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
export function* deleteAddress(action){
    console.log(action.payload)
    try{
        yield call(deleteAddressFetch,action.payload);
        yield put(getAddressStart())
    }catch(error){
        yield put(deleteAddressFailure(error))
    }
}
export function* updateAddress(action){
    try{
        const {message} = yield call(updateAddressFetch,action.payload);
        if(message){
            yield put(updateAddressSuccess({message}));
          yield put(getAddressStart());
        }
        
       
    }catch(error){
        yield put(updateAddressFailure(error))
    }
}
export function* getAddress(){
    try{
        const address = yield call(getAddressFetch);
        yield put(getAddressSuccess(address))
    }catch(error){
        yield put(getAddressFailure(error))
    }
}
export function* setAddress(action){
    try{
        const address = yield call(setAddressFetch,action.payload);
       if(address){
        yield put(setAddressSuccess(address))
       }
       
    }catch(error){
        yield put(setAddressFailure(error))
    }
}
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
export function* onDeleteAddess(){
    yield takeLatest(userActionType.DELETE_ADDRESS_START,
        deleteAddress)
}
export function* onUpdateAddress(){
    yield takeLatest(userActionType.UPDATE_ADDRESS_START,
        updateAddress)
}
export function* onGetAddress(){
    yield takeLatest(userActionType.GET_ADDRESS_START,
        getAddress)
}
export function* onSetAddress(){
    yield takeLatest(userActionType.SET_ADDRESS_START,
        setAddress)
}
export function* fetchSecret(){
    yield takeLatest(userActionType.DASH_GET_START,
        secret)
}
//userActionListeners <--(level-1) below
export function* userSagas(){
    yield all([
        call(fetchSecret),
        call(onSetAddress),
        call(onGetAddress),
        call(onUpdateAddress),
        call(onDeleteAddess)
    ])
}