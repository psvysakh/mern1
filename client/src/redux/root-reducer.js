import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth.reducer';
import userReducer from './user/user.reducer';
import adminReducer from './admin/admin.reducer';
import coreReducer from './core/core.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig={
    key:'root',
    storage,
    whitelist:['auth','user','cart']
}

const appReducer=combineReducers({
    auth:authReducer,
    user:userReducer,
    admin:adminReducer,
    core:coreReducer,
    cart:cartReducer
});

const rootReducer=(state,action)=>{
    if(action.type==='SIGNOUT_SUCCESS'){
        state={
            ...state,
            auth:undefined,
            user:undefined
        }
    }
    return appReducer(state,action);
}

export default persistReducer(persistConfig,rootReducer);