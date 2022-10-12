import { Box, Checkbox, IconButton, List, ListItem, ListItemText } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { TodoModel } from "../../../types";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTodoItem, setSelectedId } from "../../../store/slice/todo";
import { useDispatch } from "react-redux";
import { StoreDispatch, StoreState } from '../../../store';
import { useSelector } from "react-redux";

const TodoListSection: React.FC = () => {
  
  const dispatch = useDispatch<StoreDispatch>();
  const [list, setList] = useState([] as TodoModel[])

  const { todo } = useSelector((state: StoreState) => state);

  useEffect(() => {
    setList(todo.items);
  }, [todo.items]);

  const onCheckBoxChange = useCallback((isChecked: boolean, id: string) => {
    if(isChecked){
      dispatch(setSelectedId(id));
    }else {
      dispatch(setSelectedId(''));
    }
  }, [dispatch]);

  return (
    <List sx={{ minHeight: "300px" }}>
      {list?.map((item: TodoModel, index: number) => {
        return (
          <ListItem
            key={index}
            sx={{
              position: "relative",
              border: "1px solid #989898",
              bgcolor: "#fff",
              my: 1,
              borderRadius: "3px",
              "& .MuiTypography-root": {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            <ListItemText
              sx={{
                wordBreak: "break-word",
              }}
            >
              <Box component="span" width="100%">
                {item.title}
              </Box>

              <Box display="flex" component="span">
                <IconButton onClick={() => dispatch(deleteTodoItem(item.id))}>
                  <DeleteIcon />
                </IconButton>
                <Checkbox
                  edge="end"
                  checked = { item.isSelected }
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => onCheckBoxChange(e.target.checked, item.id) }
                />
              </Box>
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TodoListSection;
