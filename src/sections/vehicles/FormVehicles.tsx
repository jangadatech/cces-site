'use client'

import IVehicle from "@/interfaces/IVehicle";
import { Box, TextField, Button, Container, Typography, Stack, CircularProgress, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FormVehicleProps {
  handleSubmit: (values: IVehicle) => Promise<void>;
  typeText: string;
  initialValues: IVehicle;
}

const FormVehicles = ({ handleSubmit, typeText, initialValues }: FormVehicleProps) => {

const [isLoading, setIsLoading] = useState(false);
const router = useRouter();


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
                          label="Placa"
                          name="place"
                          type="text"
                          value={formikProps.values.plate}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Placa"
                        />

                        <TextField
                          fullWidth
                          label="Prefixo"
                          name="prefix"
                          select
                          value={formikProps.values.prefix}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Prefixo"
                        >
                          {profiles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    <Stack spacing={10} direction="row">
                      <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                      />
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
