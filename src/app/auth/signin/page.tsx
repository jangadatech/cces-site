'use client'

import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = () => {

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setIsLoading(true)
    e.preventDefault();
    const credentials = { username, password };
    const result = await signIn('credentials', { ...credentials, redirect: false });

    if (result?.error) {
      console.error('Login falhou:', result.error);
      setIsLoading(false);
      toast.error("Credenciais Ínválidas", {
        position: "top-right",
        theme: "colored",
        });
    } else {
      router.replace('/');
      setIsLoading(false);
    }
  };
  return (
    <>
      <title>Login | Central de Controle de Entrada e Saída - CCES</title>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ToastContainer />
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
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Senha"
                name="password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                {isLoading ? <CircularProgress color="secondary" size={24} /> : 'Entrar'} 
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SignInPage;
