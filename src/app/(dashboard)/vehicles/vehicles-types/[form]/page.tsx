'use client'

import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import IVehicleType from '@/interfaces/IVehicleType';
import { Box, Stack, TextField, Button, Container, Typography} from '@mui/material';
import { Formik , Form, Field, FormikValues  } from 'formik';
import { URL } from '@/http/config';
import * as Yup from 'yup';
import { useParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

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

const updateVehicleType = async (id: any, data: IVehicleType, ) => {
  try{
    console.log('data do update', data)
    const response = await axios.put(`${URL}/api/vehicles-types/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
  catch(error: any){
    console.error('Erro ao atualizar o tipo de veículo', error.message)
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

const FormVehiclesTypes = () => {

  const [form, setForm] = useState<IVehicleType>({
    _id: '',
    name: '',
    seat: 0
  });


  // function queryParamFilter(id: any) {
  //   return !id.startsWith('vehicles-types/');
  // }
  
  const { form: id } = useParams()
  

  console.log('id', id)

  const getVehiclesTypesById = async (id: any) => {
    try{
      const {data} = await axios.get(`/api/vehicles-types/${id}`)
      return data
    }

    catch(error: any){
      console.log('Erro ao lista tipos de veículos', error.message);
    }
  }
  
  useEffect(() => {
    const fetchVehiclesTypeById = async () => {
      const vehicleType = await getVehiclesTypesById(id)
      if(vehicleType){
        setForm(vehicleType)
      }
    }
    fetchVehiclesTypeById()
  },[]);
  
  const handleSubmit = async (values: FormikValues, {setSubmitting}: any) => {
      try{
        if(id === 'form'){
          await createVehicleType(values as IVehicleType);
          setSubmitting(false);
        }else{
          await updateVehicleType(id, values as IVehicleType);
          setSubmitting(false);
        }
        
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
                      name: form ? form.name : '',
                      seat: form ? form.seat : 0,
                    }}
                    enableReinitialize={true}
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

export default FormVehiclesTypes;

function startWith(arg0: string) {
  throw new Error('Function not implemented.');
}

