import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TodoComponent from "./components/todo/todo.container";

function App() {

  return (
    <Container>
      <Typography textAlign="center" variant="h3" mt={3} mb={5}>
        ToDo APP with Redux
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item md={12}>
            <TodoComponent />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
