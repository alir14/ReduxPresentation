import { getRandomUserId } from "./../../common/helper";
import { TodoEntity } from "./../../entities/todosEntity";
import { TodoModel } from "./../../types/index";
import { put, takeLatest, call, select } from "redux-saga/effects";
import * as actions from "./actions";
import {
  addTodoItem,
  deleteTodoItem,
  failedloadingTodoItems,
  loadedTodoItems,
  loadingTodoItems,
  reloadTodoItems,
  setSelectedId,
  updateTodoItem,
} from "./reducer";
import { fetchTodoItems } from "../../api";
import { TodosEntity } from "../../entities/todosEntity";
import { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TodosList } from "./selector";

export function* rootSaga() {
  yield takeLatest(actions.LOADING_TODOS, loadTodos);
  yield takeLatest(actions.ADD_TODOS, addTodo);
  yield takeLatest(actions.UPDATE_TODOS, updateTodo);
  yield takeLatest(actions.DELETE_TODOS, deleteTodo);
  yield takeLatest(actions.SET_SELECTED_TODO_ID, setSelectedTodoId);
}

export function* loadTodos() {
  try {
    yield put(loadingTodoItems());

    const response: TodosEntity = yield call(fetchTodoItems);

    const list = response.data.map((item: TodoEntity) => {
      return {
        ...item,
        isSelected: false,
      } as TodoModel;
    });

    yield put(loadedTodoItems(list));
  } catch (error) {
    yield put(failedloadingTodoItems());
  }
}

export function* addTodo(action: PayloadAction<TodoModel>) {
  try {
    const userId: number = yield call(getRandomUserId, 100);

    const newItem: TodoModel = {
      ...action.payload,
      id: uuidv4(),
      UserId: userId,
    };

    yield put(addTodoItem(newItem));
  } catch (error) {
    yield put(failedloadingTodoItems());
  }
}

export function* updateTodo(action: PayloadAction<TodoModel>) {
  try {
    const newItem = action.payload;
    if(newItem.title !== '' || newItem.title !== undefined){
        yield put(updateTodoItem(newItem));
    }
  } catch (error) {
    yield put(failedloadingTodoItems());
  }
}

export function* deleteTodo(action: PayloadAction<string>) {
  try {
    if(action.payload !== '' || action.payload !== undefined){
        yield put(deleteTodoItem(action.payload));
    }
  } catch (error) {
    yield put(failedloadingTodoItems());
  }
}

export function* setSelectedTodoId(action: PayloadAction<string>) {
    if(action.payload !== '' || action.payload !== undefined){
        yield put(setSelectedId(action.payload));

        const list: TodoModel[] = yield select(TodosList);
        const updatedlist = list.map(item => {
            if(item.id !== action.payload) {
                item = {...item, isSelected: false};
            }
            else {
                item = {...item, isSelected: true};
            }

            return item;
        });

        yield put(reloadTodoItems(updatedlist));
    }
}