'use client'
import IInputOutput from "@/interfaces/IInputOutput";
import { Box, TextField, Button, Container, Typography, Stack, CircularProgress, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {URL} from '@/http/config';
import IDriver from "@/interfaces/IDriver";
import IVehicle from "@/interfaces/IVehicle";
import { useEffect, useState } from "react";

interface FormInputOutputProps {
  handleSubmit: (values: IInputOutput) => Promise<void>;
  typeText: string;
  initialValues: IInputOutput;
}

async function getVehicles() {
  const res = await fetch(`${URL}/api/vehicles`)
  return res.json()
}

async function getDrivers() {
  const res = await fetch(`${URL}/api/drivers`)
  return res.json()
}

const FormUsers = ({ handleSubmit, typeText, initialValues }: FormInputOutputProps) => {

  const router = useRouter();
  const [vehicles, setVehicles] =useState<IVehicle[]>([])
  const [drivers, setDrivers] =useState<IDriver[]>([])

  useEffect(() => {
    async function fetchAll(){
      const vehiclesData = await getVehicles();
      const driversData = await getDrivers();
      setVehicles(vehiclesData)
      setDrivers(driversData)
    }
    fetchAll()
  })

  const status = [
    { value: 'input', label: 'Entrada' },
    { value: 'output', label: 'Saída' }
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
                  {typeText} Entrada e Saída
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
                          label="Motorista"
                          name="driver"
                          select
                          value={formikProps.values.driver.name}
                          onChange={formikProps.handleChange}
                          variant="standard"
                        >
                          {drivers.map((option: IDriver) => (
                            <MenuItem key={option._id} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          fullWidth
                          label="Veículo"
                          name="vehicle"
                          select
                          value={formikProps.values.vehicle.prefix}
                          onChange={formikProps.handleChange}
                          variant="standard"
                        >
                          {vehicles.map((option: IVehicle) => (
                            <MenuItem key={option._id} value={option.prefix}>
                              {option.prefix}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          fullWidth
                          label="Destino"
                          name="destiny"
                          type="text"
                          value={formikProps.values.destiny}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Destino"
                        />
                      </Stack>
                      <Stack spacing={10} direction="row">
                        <TextField
                          fullWidth
                          label="Ôdometro"
                          name="odometer"
                          value={formikProps.values.odometer}
                          onChange={formikProps.handleChange}
                          variant="standard"
                        />

                        <TextField
                          fullWidth
                          label="Status"
                          name="status"
                          select
                          value={formikProps.values.status}
                          onChange={formikProps.handleChange}
                          variant="standard"
                        >
                          {status.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          fullWidth
                          label="Descrição"
                          name="description"
                          type="text"
                          value={formikProps.values.description}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Destino"
                        />
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

export default FormUsers
