import { Box, Checkbox, IconButton, List, ListItem, ListItemText } from "@mui/material";
import React, { useCallback } from "react";
import { TodoModel } from "../../../types";
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoListSectionProps {
  list: TodoModel[];
  deleteTodo: (id?:string)=> void;
  setSelectedId: (id?:string) => void;
}

const TodoListSection: React.FC<TodoListSectionProps> = (props: TodoListSectionProps) => {
  
  const {
    list,
    deleteTodo,
    setSelectedId,
  } = props;

  const onCheckBoxChange = useCallback((isChecked: boolean, id?: string) => {
    if(isChecked){
      setSelectedId(id);
    }else {
      setSelectedId('');
    }
  }, [setSelectedId]);

  return (
    <List data-testid="todoItemsList" sx={{ minHeight: "300px" }}>
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
                <IconButton onClick={() => deleteTodo(item.id)}>
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
