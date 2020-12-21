import {takeLatest,put,all,call} from 'redux-saga/effects';
import axios from 'axios';
import authActiontype from './auth.type';
/* import api from '../../helper/api'; */

import {
    signUpFailure,
    signInSuccess,
    signInFailure,
    signOutSuccess,
    emailVerificationSuccess,
    emailVerificationFailed,
    signInRequesting,
    signUpSuccess,
    signUpRequesting,
    getResetFormSuccess,
    resetPasswordSuccess,
    getResetRequesting,
    } from './auth.action';




const deleteHeader=()=>{
    axios.defaults.headers.common['Authorization'] = '';
}


//apiCall triggered by (level-2)  <-- (level-3) below

const resetFetch=async(data)=>{
    console.log(data);
    return await axios.post('/auth/resetform',
    {
        email:data.email
    }
    ).then(res=>{
        console.log(`response `,res.data);
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}
const resetPassFetch=async(data)=>{
    console.log(`password reached at saga middleware`,data);
    return await axios.post('/auth/resetPassword',
    {
        password:data.password,
        token:data.token
    }
    ).then(res=>{
        console.log(`response `,res.data);
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}


const verifyFetch=async(data)=>{
    console.log(data);
    return await axios.post('/auth/activate',
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
        return await axios.post('/auth/signup',
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
    return await axios.post('/auth/signin',
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
    
  

}
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

export function* signUp(action){
    try{
        yield put(signUpRequesting());
        const {message,error}=yield call(signUpFetch,action.payload);
        yield put(signUpSuccess(message));
       if(error){
           throw error
       }
    }catch(error){
        yield put(signUpFailure(error));
    }
}

export function* signIn(action){
    try{
        yield put(signInRequesting());
        const {newtoken,role,error}=yield call(signInFetch,action.payload);
        if(newtoken){
            yield localStorage.setItem('JWT_TOKEN',newtoken);
            yield put(signInSuccess({newtoken,role}));
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
export function* signOut(){
    yield localStorage.removeItem('JWT_TOKEN');
    yield deleteHeader();
    yield put(signOutSuccess());
}
export function* verify(action){
    
  const {history}=action.payload;
  console.log(`token reached saga`,history);
    console.log(`token ready to send to server`,action.payload);
    try{
       const {message,error}= yield call(verifyFetch,action.payload);
       if(message){
        yield put(emailVerificationSuccess(message));
        yield history.push('/signin');
       }
        if(error){
            throw error;
        }
    }catch(error){
        yield put(emailVerificationFailed(error))
    }
}

export function* getResetForm(action){
    try{
        yield put(getResetRequesting());
        const {message,error}=yield call(resetFetch,action.payload);
        if(message){
            console.log(message);
            yield put(getResetFormSuccess(message));
        }
        if(error){
            throw error;
        }
    }catch(error){
        console.log(error);
    }
}
export function* resetPassword(action){
    const {history}=action.payload;
    try{
        yield put(getResetRequesting());
        const {message,error}=yield call(resetPassFetch,action.payload);
        if(message){
            yield put(resetPasswordSuccess(message));
            yield history.push('/signin');
        }
        if(error){
            throw error;
        }
    }catch(error){
        console.log(error);
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
export function* onReset(){
    yield takeLatest(authActiontype.RESET_REQUEST_START,
        getResetForm)
}
export function* onPasswordReset(){
    yield takeLatest(authActiontype.RESET_PASSWORD,
        resetPassword)
}


export function* authSagas(){
    yield all([
        call(onSignUp),
        call(onSignIn),
        call(onGoogleAuth),
        call(onSignOutStart),
        call(onVerifyToken),
        call(onReset),
        call(onPasswordReset),
    ])
}