import {takeLatest,put,all,call} from 'redux-saga/effects';
import axios from 'axios';
import authActiontype from './auth.type';


import {
    signUpFailure,
    signUpComplete,
    signInSuccess,
    signInFailure,
    signOutSuccess,
    emailVerificationSuccess,
    emailVerificationFailed
    } from './auth.action';

axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT_TOKEN')
}
const api = axios.create({baseURL: 'http://localhost:8001'})

//apiCall triggered by (level-2)  <-- (level-3) below

const verifyFetch=async(data)=>{
    console.log(data);
    return await api.post('/auth/activate',
    {
        token:data.token
    }
    ).then(res=>{
        console.log(`response `,res.data);
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    });
}

const signUpFetch=async (data)=>{
        return await api.post('/auth/signup',
           {
                name:data.name,
                email:data.email,
                password:data.password
            }
      
    ).then(res=>{
        console.log(`response `,res.data);
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    });
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
  
}
const signInFetch=async (data)=>{
                                            //axios Method Below
    return await api.post('/auth/signin',
        {
            email:data.email,
            password:data.password
        })
        .then(res => {
            console.log(`response `,res.data);
            return res.data;
        })
        .catch(err => {
            console.log(`Error catched and thrown`,err.response.data);
            return err.response.data;
        });
    
                                                            //Fetch Method Below
   /*  return await fetch('http://localhost:8001/auth/signin', {        
        method:'POST',
        headers:{
            Authorization:localStorage.getItem('JWT_TOKEN'),
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:data.email,
            password:data.password
        })
       
       }).then(res=>{
           return res.json();
       })
       .catch(error=>{
           return error;
       }); */

}
const googleFetch=async(accessToken)=>{
        return await api.post('/auth/oauth/google',{
            access_token:accessToken
        })
        .then(res => {
            console.log(`response `,res.data);
            return res.data;
        })
        .catch(err => {
            return err.response.data;
        });
   /*  return await fetch('http://localhost:8001/auth/oauth/google',{
        method:'POST',
        headers:{
            Authorization:localStorage.getItem('JWT_TOKEN'),
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            access_token:accessToken
        })
    })
    .then(res=>{
        return res.json();
    })
    .catch(error=>{
        return error;
    }); */
}

//functions triggered by (level-1)  <-- (level-2) below

export function* signUp(action){
    const {userCredentials} = action.payload;
    try{
        const {message}=yield call(signUpFetch,userCredentials);
        yield put(signUpComplete({message}));
       
    }catch(error){
        yield put(signUpFailure(error));
    }
}

export function* signIn(action){
    const {userCredentials} = action.payload;
    try{
        const {newtoken,message,error}=yield call(signInFetch,userCredentials);
       
        if(newtoken){
            yield localStorage.setItem('JWT_TOKEN',newtoken);
            yield put(signInSuccess({newtoken,message}));
        }
        if(error){
            console.log(error);
            throw error;
        }
    }catch(error){
       console.log(error)
        yield put(signInFailure(error));
    }
}

export function* googleSignIn(action){
    const {token}=action.payload;
    try{
        const {newtoken,error} = yield call(googleFetch,token);
        if(newtoken){
            console.log(newtoken);
            yield localStorage.setItem('JWT_TOKEN',newtoken);
            yield put(signInSuccess({newtoken,message:"Google signin success"}));
           
        }
        else{
            throw error;
        }

    }catch(error){
        yield put(signInFailure(error));
    }
}
export function* signOut(){
    yield put(signOutSuccess());
}
export function* verify(action){
   
    console.log(`token ready to send to server`,action.payload);
    try{
       const {message,error}= yield call(verifyFetch,action.payload);
       if(message){
        yield put(emailVerificationSuccess(message));
       }
        if(error){
            throw error;
        }
    }catch(error){
        yield put(emailVerificationFailed(error))
    }
}

//userActionListeners <--(level-1) below

export function* onSignUp(){
    yield takeLatest(authActiontype.SIGNUP_START,
        signUp)
}
export function* onSignIn(){
    yield takeLatest(authActiontype.SIGNIN_START,
        signIn)
}
export function* onGoogleAuth(){
    yield takeLatest(authActiontype.GOOGLE_AUTH,
        googleSignIn)
}
export function* onSignOutStart(){
    yield takeLatest(authActiontype.SIGNOUT_START,
        signOut)
}
export function* onVerifyToken(){
    yield takeLatest(authActiontype.VERIFY_TOKEN,
        verify)
}

export function* authSagas(){
    yield all([
        call(onSignUp),
        call(onSignIn),
        call(onGoogleAuth),
        call(onSignOutStart),
        call(onVerifyToken)
    ])
}