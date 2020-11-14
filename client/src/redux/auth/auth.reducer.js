
import authActiontype from './auth.type';

const INITIAL_STATE={
    isAuthenticated:false,
    token:'',
    requesting: false,
    successful: false,
    messages:'',
    errors:'',
}


const authReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case authActiontype.SIGNUP_REQUESTING:
            return{
                    ...state,
                    requesting:true,
                    successful:false,
                    messages:'',
                    errors:''
                }
        case authActiontype.SIGNUP_SUCCESS:
            return{
                ...state,
                requesting: false,
                successful: true,
                messages:action.payload,
                errors:'',
            }
        case authActiontype.SIGNUP_FAILURE:
        return{
            ...state,
            requesting:false,
            successful:false,
            messages:'',
            errors:action.payload
        }
            case authActiontype.EMAIL_VERIFIED:
            return {
                ...state,
                requesting: false,
                successful: true,
                messages:action.payload,
                errors: '',
            }
            case authActiontype.EMAIL_VERIFICATION_FAILED:
            return{
                ...state,
                requesting:false,
                successful:false,
                messages:'',
                errors:action.payload
            }
            case authActiontype.SIGNIN_REQUESTING:
            return{
                    ...state,
                    requesting:true,
                    successful:false,
                    messages:'',
                    errors:''
                }
            case authActiontype.SIGNIN_SUCCESS:
            return{
                ...state,
                isAuthenticated:true,
                token:action.payload.newtoken,
                requesting:false,
                successful:true,
                messages:action.payload.message,
                errors:''
            }
            case authActiontype.SIGNIN_FAILURE:
            return{
                ...state,
                requesting:false,
                successful:false,
                messages:'',
                errors:action.payload
            }
            case authActiontype.RESET_REQUEST_SUCCESS:
                return{
                    ...state,
                    messages:action.payload
                }
            case authActiontype.RESET_PASSWORD_SUCCESS:
                    return{
                        ...state,
                        messages:action.payload
                    }
       
            case authActiontype.SIGNOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated:false,
                token:action.payload.token,
                requesting:false,
                successful:true,
                messages:action.payload.message,
                errors:''
            }
            case authActiontype.CLEAR_ERROR:
                return{
                    ...state,
                    requesting: false,
                    successful: false,
                    errors:''
                }
            case authActiontype.CLEAR_MESSAGE:
                return{
                    ...state,
                    requesting: false,
                    successful: false,
                    messages:''
                }
            default:
            return state;
    }
}

export default authReducer;