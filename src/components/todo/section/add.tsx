import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Alert, Box, Button, Collapse } from "@mui/material";
import { TodoModel } from "../../../types";

interface IAddSectionPropos {
  selectedTodoItem?: TodoModel;
  addTodo: (item: TodoModel) => void;
  updateTodo: (item: TodoModel) => void;
}
const AddTodoItemSection: React.FC<IAddSectionPropos> = (
  props: IAddSectionPropos
) => {
  const { selectedTodoItem, addTodo, updateTodo } = props;

  const [isError, setIsError] = useState({ isShow: false, text: "" });
  const [textDescription, setTextDescription] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (selectedTodoItem) {
      const value = selectedTodoItem.title;
      setTextDescription(value);
    }
  }, [selectedTodoItem]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextDescription(e.target.value);
    setIsDisabled(e.target.value?.length === 0 || e.target.value.length > 15);
    setIsError({
      isShow: e.target.value?.length > 15,
      text:
        e.target.value?.length > 15
          ? "The input value cannot be more than 15 characters"
          : "",
    });
  };

  const handleAddOnClick = () => {
    if (!isError.isShow) {
      const todoItem: TodoModel = {
        completed: false,
        title: textDescription,
        isSelected: false,
      };
      addTodo(todoItem);
      setTextDescription("");
    }
  };

  const handleUpdateOnClick = () => {
    if (!isError.isShow) {
      if (selectedTodoItem) {
        const newItem: TodoModel = {
          ...selectedTodoItem,
          title: textDescription,
        };
        updateTodo(newItem);
        setTextDescription("");
      }
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Todo item"
        onChange={handleOnChange}
        value={textDescription}
        variant="outlined"
        size="small"
      />

      <Collapse in={isError.isShow}>
        <Alert severity="error" sx={{ my: 1 }}>
          {isError.text}
        </Alert>
      </Collapse>

      <Box width="100%" display="flex" justifyContent="center">
        <Button
          size="medium"
          sx={{ my: 1, maxWidth: 200 }}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleAddOnClick}
          disabled={isDisabled}
        >
          Add Item
        </Button>
      </Box>
      <Box width="100%" display="flex" justifyContent="center">
        <Button
          size="medium"
          sx={{ my: 1, maxWidth: 200 }}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleUpdateOnClick}
          disabled={isDisabled}
        >
          Update Item
        </Button>
      </Box>
    </div>
  );
};

export default AddTodoItemSection;
