import { TodoModel } from './../../types/index';
import { RootState } from "../rootReducer";
import { createSelector } from "reselect";

export const TodosList = (state: RootState) => state.TodoState.items;
export const selectedTodoId = (state: RootState) => state.TodoState.selectedId;
export const isLoading = (state: RootState) => state.TodoState.isLoading;

export const selectedTodo = (id: string) => createSelector(
    TodosList,
    (list) => {
        const item = list?.find(item=> item.id === id);

        return (item) ? item : {
            title:''
        } as TodoModel;
    }
)