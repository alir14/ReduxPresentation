import { combineReducers } from '@reduxjs/toolkit';
import TodoState from './todo/reducer';

const rootReducer = combineReducers({
    TodoState,
});

//declare type for state of the App
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;