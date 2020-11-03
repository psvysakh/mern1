import authActiontype from './auth.type';

export const signUpStart=(data)=>({
    type:authActiontype.SIGNUP_START,
    payload:data
});
export const emailVerificationSuccess=(message)=>({
    type:authActiontype.EMAIL_VERIFIED,
    payload:message
});
export const emailVerificationFailed=(error)=>({
    type:authActiontype.EMAIL_VERIFICATION_FAILED,
    payload:error
});
export const signUpComplete=({message})=>({
    type:authActiontype.SIGNUP_COMPLETE,
    payload:{message}
});
export const signUpFailure=(error)=>({
    type:authActiontype.SIGNUP_FAILURE,
    payload:error
});
export const signInStart=(data)=>({
    type:authActiontype.SIGNIN_START,
    payload:data
});
export const signInSuccess=({newtoken,message})=>({
    type:authActiontype.SIGNIN_SUCCESS,
    payload:{newtoken,message}
});
export const signInFailure=(error)=>({
    type:authActiontype.SIGNIN_FAILURE,
    payload:error
});

export const googleOAut=(data)=>({
type:authActiontype.GOOGLE_AUTH,
payload:data
});

export const signOutStart=()=>({
    type:authActiontype.SIGNOUT_START
    
})
export const signOutSuccess=()=>({
    type:authActiontype.SIGNOUT_SUCCESS,
    payload:{
        token:'',
        message:"SignOut Successful"
    }
})
export const verifyToken=(data)=>({
    type:authActiontype.VERIFY_TOKEN,
    payload:data
})

export const msgSignUpAutoClear=()=>({
    type:authActiontype.SIGNUP_MSGCLEAR,
    payload:''
})
export const msgSignInAutoClear=()=>({
    type:authActiontype.SIGNIN_MSGCLEAR,
    payload:''
})
export const msgSignOutAutoClear=()=>({
    type:authActiontype.SIGNOUT_MSGCLEAR,
    payload:''
})
export const msgVerifyEmailAutoClear=()=>({
    type:authActiontype.VERIFY_MSGCLEAR,
    payload:''
})