import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoModel } from '../../types';

export interface TodoState {
    selectedId: string
    items: TodoModel[]
    isLoading: boolean
    hasError: boolean
}

const TodoInitialState: TodoState = {
    items: [] as TodoModel[]
} as TodoState

export const TodoSlice = createSlice({
    name: 'TodoState',
    initialState: TodoInitialState,
    reducers: {
        loadingTodoItems: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
        loadedTodoItems: (state, action:PayloadAction<TodoModel[]>) => {
            state.isLoading = false;
            state.items = [...action.payload];
        },
        reloadTodoItems: (state, action:PayloadAction<TodoModel[]>) => {
            state.items = [...action.payload];
        },
        failedloadingTodoItems: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
        addTodoItem: (state, action:PayloadAction<TodoModel>) => {
            if(state.items){
                state.items = [...state.items, action.payload];
            } else {
                const list = [] as TodoModel[];
                list.push(action.payload)
                state.items = [...list]
            }
        },
        updateTodoItem: (state, action:PayloadAction<TodoModel>) => {
            const list = state.items.filter(item => item.id !== action.payload.id);
            state.items = [ ...list, action.payload];
        },
        deleteTodoItem: (state, action:PayloadAction<string>) => {
            const list = state.items.filter((item) => item.id !== action.payload);
            state.items = [...list];
        },
        setSelectedId: (state, action:PayloadAction<string>) => {
            state.selectedId = action.payload;
        }
    }
});

export const {
    loadingTodoItems,
    reloadTodoItems,
    loadedTodoItems, 
    failedloadingTodoItems,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem,
    setSelectedId
} = TodoSlice.actions;

export default TodoSlice.reducer; 