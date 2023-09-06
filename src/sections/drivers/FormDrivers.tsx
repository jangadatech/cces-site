import IDriver from "@/interfaces/IDriver";
import { Box, TextField, Button, Container, Typography, Stack, CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FormDriversProps {
  handleSubmit: (values: IDriver) => Promise<void>;
  typeText: string;
  initialValues: IDriver;
}

const FormDrivers = ({ handleSubmit, typeText, initialValues }: FormDriversProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

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
                  {typeText} Motorista
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
              {(formikProps: any) => (
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
                          label="Nome Completo"
                          name="full_name"
                          type="text"
                          value={formikProps.values.full_name}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Nome"
                        />

                        <TextField
                          fullWidth
                          label="Inscrição"
                          name="enrollment"
                          type="text"
                          value={formikProps.values.enrollment}
                          onChange={formikProps.handleChange}
                          variant="standard"
                          placeholder="Nome"
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

export default FormDrivers;