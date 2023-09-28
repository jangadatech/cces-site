'use client'

import IVehicle from "@/interfaces/IVehicle";
import { Box, TextField, Button, Container, Typography, Stack, CircularProgress, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '@/http/config';
import IVehicleType from "@/interfaces/IVehicleType";

interface FormVehicleProps {
  handleSubmit: (values: IVehicle) => Promise<void>;
  typeText: string;
  initialValues: IVehicle;
}

async function getVehicleTypes() {
  const res = await fetch(`${URL}/api/vehicles-types`)
  return await res.json()
}

const FormVehicles = ({ handleSubmit, typeText, initialValues }: FormVehicleProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const [vehicleTypeData, setvehicleTypeData] = useState<IVehicleType[]>();
  const router = useRouter();

  useEffect(() => {
    async function fetchVehicleTypes() {
      try {
        const response = await getVehicleTypes();
        setvehicleTypeData(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchVehicleTypes();
  }, []);

  const status = [
    { value: 'true', label: 'Ativo' },
    { value: 'false', label: 'Inativo' }
  ]

  return (
    <>
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
                  {typeText} Veículos
                </Typography>
              </Stack>
            </Stack>
          </Stack>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {(formikProps) => (
                <Form>
                  <Box sx={{
                      justifyContent: 'center',
                      py: 8,
                      flexWrap: "wrap",
                      height: '70vh'
                    }}>
                    <Stack spacing={4}>
                      <Stack spacing={10} direction="row">
                        <TextField
                          fullWidth
                          label="Prefixo"
                          name="prefix"
                          type="text"
                          value={formikProps.values.prefix}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Prefixo"
                        />
                        
                        <TextField
                          fullWidth
                          label="Placa"
                          name="plate"
                          type="text"
                          value={formikProps.values.plate}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Placa"
                        />

                      </Stack>
                    <Stack spacing={10} direction="row">

                    <TextField
                        fullWidth
                        label="Tipo"
                        name="vehicle_type_id"
                        select
                        value={formikProps.values.vehicle_type_id}
                        onChange={formikProps.handleChange}
                        variant="standard"
                      >
                        {vehicleTypeData?.map((option: any) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        fullWidth
                        label="Ativo"
                        name="active"
                        select
                        value={formikProps.values.active}
                        onChange={formikProps.handleChange}
                        variant="standard"
                      >
                        {status.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                  </Stack>
                  </Box>
                  <Stack spacing={3}>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      spacing={4}
                    >
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" onClick={() => router.back()}>Cancelar</Button>
                      <Button
                        variant="contained"
                        startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        disabled={isLoading}
                        type="submit"
                      >
                        {typeText}
                      </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
        </Container>
      </Box>
    </>
  )
}

export default FormVehicles
