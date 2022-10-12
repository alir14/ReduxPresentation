import React from "react";
import Box from "@mui/material/Box";
import AddTodoItemSection from "./section/add";
import TodoListSection from "./section/list";

const TodoComponent: React.FC = () => {

  return (
    <Box borderRadius={1} width="100%" sx={{ boxShadow: 2, p: 3 }}>
      <AddTodoItemSection />
      <TodoListSection />
    </Box>
  );
};

export default TodoComponent;
