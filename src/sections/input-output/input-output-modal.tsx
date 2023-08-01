import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Autocomplete, DialogActions, TextareaAutosize } from '@mui/material';
import getCurrentDateTime from '@/utils/current-date-time';
import Driver from '@/interfaces/driver';
import Vehicle from '@/interfaces/Vehicle';
import { URL } from '@/http/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface InputOutputModalProps {
  handleClose: () => void;
  open: boolean;
}

const inputOutputInit = {
    driver: '',
    vehicle: '',
    register_at: getCurrentDateTime(),
    odometer: '',
    description: '',
    destiny: '',
    status: 'E',
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const drivers = [
  {
      "_id": "64c90f2bfb8f21490884cfa4",
      "name": "Ronaldo",
      "full_name": "Ronaldo Teste",
      "active": true,
      "enrollment": "0001",
      "updated_at": null,
      "created_at": "2023-08-01T13:56:59.227Z",
      "__v": 0
  },
  {
      "_id": "64c918edfb8f21490884cfe6",
      "name": "João",
      "full_name": "João Teste",
      "active": true,
      "enrollment": "0002",
      "updated_at": null,
      "created_at": "2023-08-01T14:38:37.839Z",
      "__v": 0
  }
]

const vehicles = [
  {
      "_id": "64c909913f2fd72626a43c77",
      "plate": "Ana",
      "active": true,
      "prefix": "001",
      "vehicle_type": "64c9097a3f2fd72626a43c73",
      "updated_at": null,
      "created_at": "2023-08-01T13:33:05.507Z",
      "__v": 0
  }
]

const driversLabel = drivers.map((driver: Driver) => {
  return { label: driver.name, id: driver._id };
});

const prefixLabel = vehicles.map((vehicle: Vehicle) => {
  return { label: vehicle.prefix, id: vehicle._id };
});


export default function InputOutputModal({ handleClose, open }: InputOutputModalProps) {
  const [isInput, setIsInput] = useState(true);

  const handleStatusChange = (event: React.MouseEvent<HTMLElement>, newStatus: string) => {
    setIsInput(newStatus === 'E');
  };

  const handleSaveData = async (values: any) => {
    try {
      await axios.post(`${URL}/api/input-outputs`, values);
      handleClose();
      toast.success('Dados salvo com sucesso!', {theme: "colored",})
    } catch (error) {
      console.error(error);
      toast.success('Erro ao salvar dados!', {theme: "colored",})
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={inputOutputInit}
            onSubmit={(values) => {
              handleSaveData(values);
            }}
          >
            {(formikProps) => (
              <Form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <ToggleButtonGroup
                      fullWidth
                      value={formikProps.values.status}
                      exclusive
                      onChange={(e, newStatus) => {
                        formikProps.setFieldValue('status', newStatus);
                        handleStatusChange(e, newStatus);
                      }}
                      aria-label="Status"
                    >
                      <ToggleButton value="E" aria-label="Entrada" color="secondary">
                        Entrada
                      </ToggleButton>
                      <ToggleButton value="S" aria-label="Saída" color="info">
                        Saída
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={driversLabel}
                      getOptionLabel={(option) => option.label}
                      onChange={(event, driver) => {
                        formikProps.setFieldValue('driver', driver ? driver.id : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Motorista"
                          name="driver"
                          value={formikProps.values.driver}
                          onChange={formikProps.handleChange}
                          variant="outlined"
                          placeholder="Nome"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={isInput ? 'Entrada' : 'Saída'}
                      name="register_at"
                      type="datetime-local"
                      value={
                        formikProps.values.register_at || getCurrentDateTime()
                      }
                      onChange={formikProps.handleChange}
                      variant="outlined"
                      placeholder="Entrada"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={prefixLabel}
                      getOptionLabel={(option) => option.label}
                      onChange={(event, vehicle) => {
                        formikProps.setFieldValue('vehicle', vehicle ? vehicle.id : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Prefixo"
                          name="vehicle"
                          value={formikProps.values.vehicle}
                          onChange={formikProps.handleChange}
                          variant="outlined"
                          placeholder="Prefixo"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled={isInput ? false : true}
                      label="Odômetro"
                      name="odometer"
                      type="text"
                      value={formikProps.values.odometer}
                      onChange={formikProps.handleChange}
                      variant="outlined"
                      placeholder="Odometer"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Destino"
                      name="destiny"
                      value={formikProps.values.destiny}
                      onChange={formikProps.handleChange}
                      variant="outlined"
                      placeholder="Destino"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextareaAutosize
                      minRows={3}
                      maxRows={6}
                      aria-label="Descrição"
                      placeholder="Descrição"
                      name="description"
                      value={formikProps.values.description}
                      onChange={formikProps.handleChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '',
                        borderRadius: '4px',
                      }}
                    />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Salvar
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}