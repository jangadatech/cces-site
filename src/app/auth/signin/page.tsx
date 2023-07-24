import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from '@mui/material';

const SignIn = () => {
  return (
    <>
      <Head>
        <title>Login | Central de Controle de Entrada e Saída - CCES</title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="h4" align="center">
              Bem-vindo ao CCES
            </Typography>
            <Typography variant="body1" align="center">
              Central de Controle de Entrada e Saída
            </Typography>
            <Stack
              component="form"
              noValidate
              spacing={3}
              sx={{ mt: 3 }}
            >
              <TextField
                fullWidth
                label="username"
                name="username"
                type="username"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Senha"
                name="password"
                type="password"
                variant="outlined"
              />
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Entrar
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SignIn;
