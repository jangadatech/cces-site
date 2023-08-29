import { Box, TextField, Button, Container, Typography, Stack, CircularProgress, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '@/http/config';
import IVehicleType from "@/interfaces/IVehicleType";

interface FormVehicleTypeProps {
  handleSubmit: (values: IVehicleType) => Promise<void>;
  typeText: string;
  initialValues: IVehicleType;
}

async function getVehicleTypes() {
  const res = await fetch(`${URL}/api/vehicles-types`)
  return res.json()
}

const FormVehiclesTypes = async ({ handleSubmit, typeText, initialValues }: FormVehicleTypeProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const vehicleTypeData = await getVehicleTypes();

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
                          label="Nome"
                          name="name"
                          type="text"
                          value={formikProps.values.name}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Nome"
                        />

                        <TextField
                          fullWidth
                          label="Assentos"
                          name="seat"
                          type="number"
                          value={formikProps.values.seat}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Assentos"
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

export default FormVehiclesTypes
