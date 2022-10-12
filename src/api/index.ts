export const fetchTodoItems = async () => {
    await sleep(2000)
    return await import('../stubs/todolist.json');
}

const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms));