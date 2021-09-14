import {takeLatest,put,all,call} from 'redux-saga/effects';
import axios from 'axios';
import authActiontype from './auth.type';
/* import api from '../../helper/api'; */

import {
    signInSuccess,
    signInFailure
    } from './auth.action';





//apiCall triggered by (level-2)  <-- (level-3) below



/* const signUpFetch=async (data)=>{ */
    
       /*  return await fetch('http://localhost:8001/auth/signup', {
            method:'POST',
            headers:{
                Authorization:localStorage.getItem('JWT_TOKEN'),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:data.name,
                email:data.email,
                password:data.password
            })
           
           }).then(res=>{
               return res.json();
           })
           .catch(error=>{
               return error;
           }); */
  
/* } */

const googleFetch=async(accessToken)=>{
        return await axios.post('/auth/oauth/google',{
            access_token:accessToken
        })
        .then(res => {
            console.log(`response `,res.data);
            return res.data;
        })
        .catch(err => {
            return err.response.data;
        });

}

//functions triggered by (level-1)  <-- (level-2) below



export function* googleSignIn(action){
    const {token}=action.payload;
    try{
        
        const {newtoken,role,error} = yield call(googleFetch,token);
        if(newtoken){
            yield localStorage.setItem('JWT_TOKEN',newtoken);
            yield put(signInSuccess({newtoken,role}));
           
        }
        else{
            throw error;
        }

    }catch(error){
        yield put(signInFailure(error));
    }
}


//userActionListeners <--(level-1) below

export function* onGoogleAuth(){
    yield takeLatest(authActiontype.GOOGLE_AUTH,
        googleSignIn)
}



export function* authSagas(){
    yield all([
        call(onGoogleAuth)
    ])
}