import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { TodoModel } from "../../../types";
import { Alert, Box, Button, Collapse } from "@mui/material";
import { useDispatch } from "react-redux";
import { StoreDispatch, StoreState } from "../../../store";
import { addTodoItem, updateTodoItem } from "../../../store/slice/todo";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";

interface IAddSectionPropos {
  selectedId?: number;
}
const AddTodoItemSection: React.FC<IAddSectionPropos> = (props: IAddSectionPropos) => {
  const [isError, setIsError] = useState({ isShow: false, text: "" });
  const [textDescription, setTextDescription] = useState("");
  const dispatch = useDispatch<StoreDispatch>();

  const { todo } = useSelector((state: StoreState) => state);

  useEffect(() => {
    if(todo.selectedId){
      const value = todo.items.find(item => item.id === todo.selectedId)?.title;
      setTextDescription((value)? value : '');
    }
  }, [todo.selectedId, todo.items]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextDescription(e.target.value);
    setIsError({
      isShow: textDescription.length > 15,
      text:
        textDescription.length > 15
          ? "The input value cannot be more than 15 characters"
          : "",
    });
  };

  const handleAddOnClick = () => {
    if (!isError.isShow) {
      const todoItem: TodoModel = {
        id: uuidv4(),
        UserId:1,
        completed: false,
        title: textDescription,
        isSelected: false
      }
      dispatch(addTodoItem(todoItem));
      setTextDescription("");
    }
  };

  const handleUpdateOnClick = () => {
    if (!isError.isShow) {
      const value = todo.items.find(item => item.id === todo.selectedId);
      if(value)
      {
        const newItem: TodoModel = { ...value, title: textDescription};
        dispatch(updateTodoItem(newItem));
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
          disabled={
            textDescription.length === 0 || textDescription.length > 200
          }
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
          disabled={
            textDescription.length === 0 || textDescription.length > 200
          }
        >
          update Item
        </Button>
      </Box>
    </div>
  );
};

export default AddTodoItemSection;
