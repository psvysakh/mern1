import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth.reducer';
import userReducer from './user/user.reducer';

const persistConfig={
    key:'root',
    storage,
    whitelist:['auth','user']
}

const appReducer=combineReducers({
    auth:authReducer,
    user:userReducer
});

const rootReducer=(state,action)=>{
    if(action.type==='SIGNOUT_SUCCESS'){
        state=undefined;
    }
    return appReducer(state,action);
}

export default persistReducer(persistConfig,rootReducer);