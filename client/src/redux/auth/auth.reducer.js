
import authActiontype from './auth.type';

const INITIAL_STATE={
    isAuthenticated:false,
    token:'',
    signUp:{
        message:'',
        errorMsg:''
    },
    emailVerify:{
        message:'',
        errorMsg:''
    },
    signIn:{
        message:'',
        errorMsg:''
    },
    signOut:{
        message:''
    }

}

const authReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case authActiontype.SIGNUP_COMPLETE:
            return{
                ...state,
                signUp:{
                    message:action.payload.message,
                    errorMsg:''
                }
            }
        case authActiontype.EMAIL_VERIFIED:
            return {
                ...state,
                emailVerify:{
                    message:action.payload
                }
            }
        case authActiontype.EMAIL_VERIFICATION_FAILED:
            return{
                ...state,
                emailVerify:{
                    ...state.emailVerify,
                    errorMsg:action.payload
                }
            }
        case authActiontype.SIGNIN_SUCCESS:
            return{
                ...state,
                isAuthenticated:true,
                token:action.payload.newtoken,
                signIn:{
                    message:action.payload.message,
                    errorMsg:''
                }
            }
        case authActiontype.SIGNUP_FAILURE:
            return{
                ...state,
                signUp:{
                    ...state.signUp,
                    errorMsg:action.payload
                }
            }
        case authActiontype.SIGNIN_FAILURE:
            return{
                ...state,
                signIn:{
                    ...state.signIn,
                    errorMsg:action.payload
                }
            }
        case authActiontype.SIGNOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated:false,
                token:action.payload.token,
                signOut:{
                    message:action.payload.message
                }
            }
        case authActiontype.SIGNUP_MSGCLEAR:
            return{
                ...state,
                signUp:{
                    message:action.payload,
                    errorMsg:action.payload
                }
            }
        case authActiontype.SIGNIN_MSGCLEAR:
            return{
                ...state,
                signIn:{
                    message:action.payload,
                    errorMsg:action.payload
                }
            }
        case authActiontype.SIGNOUT_MSGCLEAR:
        return{
            ...state,
            signOut:{
                message:action.payload
            }
        }
        case authActiontype.VERIFY_MSGCLEAR:
        return{
            ...state,
            emailVerify:{
                message:action.payload,
                errorMsg:action.payload
            }
        }
        default:
            return state;
    }
}

export default authReducer;