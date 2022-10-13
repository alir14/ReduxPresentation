import { TodoModel } from '../types';

export const fetchTodoItems = async () => {
    await sleep(2000)
    return await import('../stubs/todolist.json');
}

export const callAddTodoItem = async (newItem: TodoModel) => {
    return Promise.resolve(true);
}

export const callUpdateTodoItem = async (newItem: TodoModel) => {
    return Promise.resolve(true);
}

export const callDeleteTodoItem = async (id: string) => {
    return Promise.resolve(true);
}

const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms));