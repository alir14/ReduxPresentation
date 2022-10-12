import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TodoSlice } from './slice/todo';

export const store = configureStore({
    reducer: combineReducers({
        todo: TodoSlice.reducer,
    })
});

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
