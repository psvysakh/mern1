import {createStore,applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';

import rootSagas from './root-sagas';
const sagaMiddleware =createSagaMiddleware();
const middlewares =[sagaMiddleware];

if(process.env.NODE_ENV==='development'){
    middlewares.push(logger);
}

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

sagaMiddleware.run(rootSagas);

export const persistor=persistStore(store);