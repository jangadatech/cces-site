'use client'

import useFetch from "@/hook/useFetch";
import IDriver from "@/interfaces/IDriver";
import { Box, TextField, Button, Container, Typography, Stack, CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from 'next/navigation'

const inputOutputInit = {
  name: '',
  full_name: '',
  enrollment: '',
}

const FormDrivers = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { response: drivers, loading, error, request } = useFetch<IDriver[]>('/api/drivers');

  const handleSubmit = async (values: any) => {
    try {
      await request('post', values);
      toast.success('Dados salvo com sucesso!', { theme: 'colored' });
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar dados!', { theme: 'colored' });
    }
    setIsLoading(false);
  };

  return (
    <>
      <title>
        Cadastrar Motorista | CCES
      </title>
      <Box
        component="main"
        sx={{
          flexGrow: 1
        }}
      >
        <ToastContainer />
        <Container maxWidth={false}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4" className='title-bold'>
                  Cadastrar Motorista
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 8,
            flexWrap: "wrap"
          }}>
            <Formik
              initialValues={inputOutputInit}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {(formikProps) => (
                <Form>
                  <Stack spacing={2} direction="column">
                    <TextField
                      fullWidth
                      label="Nome"
                      name="name"
                      type="text"
                      value={formikProps.values.name}
                      onChange={formikProps.handleChange}
                      variant="outlined"
                      placeholder="Nome"
                    />

                    <TextField
                      fullWidth
                      label="Nome Completo"
                      name="full_name"
                      type="text"
                      value={formikProps.values.full_name}
                      onChange={formikProps.handleChange}
                      variant="outlined"
                      placeholder="Nome"
                    />

                    <TextField
                      fullWidth
                      label="Inscrição"
                      name="enrollment"
                      type="text"
                      value={formikProps.values.enrollment}
                      onChange={formikProps.handleChange}
                      variant="outlined"
                      placeholder="Nome"
                    />

                    <Button
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {isLoading ? <CircularProgress color="secondary" size={24} /> : 'Salvar'} 
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default FormDrivers;

