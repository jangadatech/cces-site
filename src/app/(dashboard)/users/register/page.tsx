'use client'

import React from 'react';
import { Box, Stack, TextField, MenuItem, Button, Container, Typography } from '@mui/material';
import { Formik, Form, Field, FormikValues } from 'formik';
import { User } from '@/interfaces/user';
import { URL } from '@/http/config';
import Link from 'next/link';
import { theme } from '@/themes';

const profiles = [
  {
    value: 'admin',
    label: 'Administrador',
  },
  {
    value: 'traffic-control',
    label: 'Controle de Trafego',
  },
  {
    value: 'human-resources',
    label: 'Recursos Humanos',
  },
];

async function createUser(data: User) {
  try {
    const res = await fetch(`${URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    return res.json()
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

const Register = () => {
  const handleSubmit = async (values: FormikValues, { setSubmitting, resetForm }: any) => {
    try {

      await createUser(values as User)

      resetForm();

      alert('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <title>
        Criar Usuário | CCES
      </title>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Criar Usuário
                </Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{
                  maxWidth: 550,
                  px: 3,
                  py: '100px',
                  width: '100%'
                }}
              >
                <div>
                  <Formik
                    initialValues={{
                      full_name: '',
                      username: '',
                      password: '',
                      profile: '',
                    }}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <Stack spacing={3}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Nome completo"
                            name="full_name"
                            type="text"
                          />
                          <Field
                            as={TextField}
                            fullWidth
                            label="Username"
                            name="username"
                            type="text"
                          />
                          <Field
                            as={TextField}
                            fullWidth
                            label="Senha"
                            name="password"
                            type="password"
                          />
                          <Field
                            as={TextField}
                            id="outlined-select-currency"
                            select
                            label="Perfil"
                            name="profile"
                            defaultValue=""
                          >
                            {profiles.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                          <Button
                            fullWidth
                            size="large"
                            sx={{ 
                              mt: 3
                            }}
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                          >
                            Cadastrar
                          </Button>
                          <Link href='/users'>
                            <Button
                              fullWidth
                              size="small"
                              sx={{ mt: 3 }}
                              
                            >
                              Voltar
                            </Button>
                          </Link>
                        </Stack>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Register;