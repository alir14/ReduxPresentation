import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import reducer from './rootReducer';
import sagas from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const isDevMode = process.env.NODE_ENV === 'development';

const store = configureStore({
    reducer,
    devTools: isDevMode,
    middleware
});

sagaMiddleware.run(sagas);

export default store;
