import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import AddTodoItemSection from "./section/add";
import TodoListSection from "./section/list";
import { TodoModel } from "../../types";

interface TodoBoxProps {
  list: TodoModel[];
  selectedId: string;
  isLoading: boolean;
  selectedTodoItem: (id: string) => TodoModel;
  setSelectedId: (id?: string) => void;
  getTodoList: () => void;
  addTodo: (item: TodoModel) => void;
  updateTodo: (item: TodoModel) => void;
  deleteTodo: (id?: string) => void;
}

const TodoBox: React.FC<TodoBoxProps> = (props: TodoBoxProps) => {
  const {
    list,
    selectedId,
    isLoading,
    selectedTodoItem,
    setSelectedId,
    getTodoList,
    addTodo,
    updateTodo,
    deleteTodo,
  } = props;

  useEffect(() => {
    getTodoList();
  }, [getTodoList]);

  return (
    <Box borderRadius={1} width="100%" sx={{ boxShadow: 2, p: 3 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <AddTodoItemSection
            addTodo={addTodo}
            selectedTodoItem={selectedTodoItem(selectedId)}
            updateTodo={updateTodo}
          />

          <TodoListSection
            deleteTodo={deleteTodo}
            setSelectedId={setSelectedId}
            list={list}
          />
        </div>
      )}
    </Box>
  );
};

export default TodoBox;
