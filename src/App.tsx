import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TodoComponent from "./components/todo/todo";
import { CircularProgress } from '@mui/material';
import { StoreDispatch, StoreState } from './store';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { failedloadingTodoItems, loadedTodoItems, loadingTodoItems } from './store/slice/todo';
import { fetchTodoItems } from './api';
import { TodoModel } from './types';

function App() {

  const isLoading = useSelector((state: StoreState) => state.todo.isLoading);
  const dispatch = useDispatch<StoreDispatch>();
  useEffect(() => {
    dispatch(loadingTodoItems());
    const fetchData = async () => {
      const res = await fetchTodoItems();
      const list = res.data.map((item) => {
        return {
          ...item,
          isSelected: false
        } as TodoModel
      })
      dispatch(loadedTodoItems(list));
    }

    fetchData().catch((e) => {
      dispatch(failedloadingTodoItems());
    })


  }, [dispatch])

  return (
    <Container>
      <Typography textAlign="center" variant="h3" mt={3} mb={5}>
        ToDo APP with Redux
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item md={12}>
          {
            (isLoading) ? 
            <CircularProgress />
            :
            <TodoComponent />
          }
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
