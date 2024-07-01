import { Button, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper sx={{ textAlign: "center", padding: 2 }}>
          <h1>Erro 404 - Página não encontrada</h1>
          <p>Desculpe, a página que você está procurando não existe.</p>
          <Link to="/login">
            <Button>Retornar ao login</Button>
          </Link>
        </Paper>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
