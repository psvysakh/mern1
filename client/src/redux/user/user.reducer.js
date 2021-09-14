import userActionType from './user.type';
import {pushAddress} from './user.util';
const INITIAL_STATE={
    success:false,
    address:''
}

const userReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case userActionType.DASH_GET_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case userActionType.SET_ADDRESS_SUCCESS:
       
            return{
                ...state,
                success:true,
                address:pushAddress(state.address,action.payload)
            }
            case userActionType.GET_ADDRESS_SUCCESS:
            return{
                ...state,
                address:action.payload
            }
            case userActionType.UPDATE_ADDRESS_SUCCESS:
                return {
                    ...state,
                    message:action.payload
                }
          
        default:
        return state
    }
}

export default userReducer;