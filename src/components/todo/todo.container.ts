import { TodoModel } from './../../types/index';
import { isLoading, selectedTodo } from './../../store/todo/selector';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Dispatch } from '@reduxjs/toolkit';
import { selectedTodoId, TodosList } from '../../store/todo/selector';
import * as actions from '../../store/todo/actions';
import TodoBox from './todo';

const mapStateToPorps = (state: RootState) => {
    return{
        list: TodosList(state),
        selectedId: selectedTodoId(state),
        isLoading: isLoading(state),
        selectedTodoItem: (id:string) => selectedTodo(id)(state),
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setSelectedId: (id?:string) => dispatch({type: actions.SET_SELECTED_TODO_ID, payload: id}),
        getTodoList: () => dispatch({type: actions.LOADING_TODOS }),
        addTodo: (item: TodoModel) => dispatch({type: actions.ADD_TODOS, payload: item }),
        updateTodo: (item: TodoModel) => dispatch({type: actions.UPDATE_TODOS, payload: item }),
        deleteTodo: (id?: string) => dispatch({type: actions.DELETE_TODOS, payload: id }),
    }
}

const TodoComponent = connect(mapStateToPorps, mapDispatchToProps)(TodoBox);

export default TodoComponent;
