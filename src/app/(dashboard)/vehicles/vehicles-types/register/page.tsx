'use client'


import React from 'react';
import axios from 'axios';
import IVehicleType from '@/interfaces/IVehicleType';
import { Box, Stack, TextField, MenuItem, Button, Container, Typography} from '@mui/material';
import { Formik , Form, Field, FormikValues, useFormik } from 'formik';
import { URL } from '@/http/config';
import Link from 'next/link';
import { theme } from '@/themes';
import * as Yup from 'yup';
import { ErrorSharp, TouchAppRounded } from '@mui/icons-material';


const createVehicleType = async (data: IVehicleType) => {
  try{
    const response = await axios.post(`${URL}/api/vehicles-types`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response);
  }
  catch(error: any){
    console.error('Erro ao criar o tipo de veículo', error.message)
  }
}

const vehicleTypeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'O nome do tipo de veículo deve conter pelo menos 2 caracteres')
    .max(50, 'O nome do tipo deve ser menor.')
    .required('Campo obrigatório.'),
  seat: Yup.number()
    .min(5, 'O veículo deve possuir pelo menos 5 assentos!')
    .required('Campo obrigatório.'),
});

const Register = () => {

  const handleSubmit = async (values: FormikValues, {setSubmitting}: any) => {
      try{
        await createVehicleType(values as IVehicleType);
        setSubmitting(false);
      }
      catch{
        console.log('deu ruim ao registrar')
      }
    }

  return (
    <>   
      <title>
        Cadastro de tipo
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
                  Cadastrar tipo de veículo
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
                      name: '',
                      seat: '',
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={vehicleTypeSchema}
                  >
                    {({isSubmitting, errors, touched}) =>(
                      <Form>
                        <Stack spacing={3}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Tipo de veículo"
                            name="name"
                            type="text"
                          />
                            {errors.seat && touched.seat ? (
                              <div>{errors.name}</div>
                            ) : null
                            }
                          <Field
                            as={TextField}
                            fullWidth
                            label="Quantidade de assentos"
                            name="seat"
                            type="number"
                            min="0"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                            {errors.seat && touched.seat ? (
                              <div>{errors.seat}</div>
                            ) : null
                            }
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

