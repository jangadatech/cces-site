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
import { URL } from '@/http/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IDriver from '@/interfaces/IDriver';
import IVehicle from '@/interfaces/IVehicle';
import IInputOutput from '@/interfaces/IInputOutput';

interface InputOutputModalProps {
  handleClose: () => void;
  open: boolean;
  inputOutputs: IInputOutput[] | null,
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

export default function InputOutputModal({ handleClose, open, inputOutputs }: InputOutputModalProps) {
  const [isInput, setIsInput] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {

    const fetchInputOutputData = async () => {
      try {
        const response = await axios.get(`${URL}/api/drivers`);
        setDrivers(response.data);
      } catch (error: any) {
        console.error(error.message);
      }

      try {
        const response = await axios.get(`${URL}/api/vehicles`);
        setVehicles(response.data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchInputOutputData();
  }, []);

  const driversLabel = drivers.map((driver: IDriver) => {
    return { label: driver.name, id: driver._id };
  });
  
  const prefixLabel = vehicles.map((vehicle: IVehicle) => {
    return { label: vehicle.prefix, id: vehicle._id };
  });

  const handleStatusChange = (event: React.MouseEvent<HTMLElement>, newStatus: string, formikProps: any) => {
    setIsInput(newStatus === 'input');
  };

  const handleSaveData = async (values: any) => {
    try {
      const response = await axios.post(`${URL}/api/input-outputs`, values);
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
            {(formikProps: any) => (
              <Form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <ToggleButtonGroup
                      fullWidth
                      value={formikProps.values.status}
                      exclusive
                      onChange={(e, newStatus) => {
                        formikProps.setFieldValue('status', newStatus);
                        handleStatusChange(e, newStatus, formikProps);
                      }}
                      aria-label="Status"
                    >
                      <ToggleButton value="input" aria-label="Entrada" color="secondary">
                        Entrada
                      </ToggleButton>
                      <ToggleButton value="output" aria-label="Saída" color="info">
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
                      value={isInput? formikProps.values.odometer: null}
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