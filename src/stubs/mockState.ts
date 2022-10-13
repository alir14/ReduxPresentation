import { TodoModel } from './../types/index';
import { RootState } from '../store/rootReducer';
import { TodoState } from '../store/todo/reducer';

export const MockState: RootState = {
    TodoState: {
        hasError: false,
        isLoading: false,
        items: [
            {
                completed: false,
                isSelected: false,
                title: 'sample title 1',
                id: 'a04bf9f5-68a0-43ec-9c02-17ee7bb2b435',
                UserId: 1
            } as TodoModel,
            {
                completed: false,
                isSelected: false,
                title: 'sample title 2',
                id: 'a04bf9f5-68a0-43ec-9c02-17ee7bb2b436',
                UserId: 1
            } as TodoModel,
            {
                completed: false,
                isSelected: false,
                title: 'sample title 3',
                id: 'a04bf9f5-68a0-43ec-9c02-17ee7bb2b437',
                UserId: 1
            } as TodoModel
        ] ,
        selectedId: '',
    } as TodoState
};
