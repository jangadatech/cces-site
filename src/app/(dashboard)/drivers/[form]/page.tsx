'use client'

import getCurrentDateTime from "@/utils/current-date-time";
import { Box, Grid, ToggleButtonGroup, ToggleButton, Autocomplete, TextField, TextareaAutosize, DialogActions, Button, Container, Typography, Stack } from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import style from "styled-jsx/style";

const inputOutputInit = {
    name: '',
    full_name: '',
    active: '',
    enrollment: '',
    updated_at: '',
    created_at: '',
}

const handleSaveData = async (values: any) => {
    try {
      await axios.post(`${URL}/api/drivers`, values);
      toast.success('Dados salvo com sucesso!', {theme: "colored",})
    } catch (error) {
      console.error(error);
      toast.success('Erro ao salvar dados!', {theme: "colored",})
    }
  };

const FormDrivers = () => {

  return (
    <>
      <title>
        Entrada e Saída | CCES
      </title>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
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
              <Stack>
                <div>
                  
                </div>
              </Stack>
            </Stack>
          </Stack>
          <Formik
            initialValues={inputOutputInit}
            onSubmit={(values) => {
              handleSaveData(values);
            }}
          >
          {(formikProps) => (
            <Form>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
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
                </Grid>
              </Grid>
            </Form>
          )}
          </Formik>
        </Container>
      </Box>
    </>
  )
}

export default FormDrivers;

