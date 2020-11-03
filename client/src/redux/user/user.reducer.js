import userActionType from './user.type';

const INITIAL_STATE={
    secret:''
}

const userReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case userActionType.DASH_GET_SUCCESS:
            return {
                ...state,
                secret:action.payload
            }
        default:
        return state
    }
}

export default userReducer;