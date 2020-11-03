import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth.reducer';
import userReducer from './user/user.reducer';

const persistConfig={
    key:'root',
    storage,
    whitelist:['auth']
}

const rootReducer=combineReducers({
    auth:authReducer,
    user:userReducer
});

export default persistReducer(persistConfig,rootReducer);