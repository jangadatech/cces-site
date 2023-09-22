import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Autocomplete, TextareaAutosize } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
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
  inputOutputs?: IInputOutput[] | null,
  setInputOutputs: Dispatch<SetStateAction<IInputOutput[] | undefined>>;
}

const inputOutputInit = {
    driver: '',
    vehicle: '',
    register_at: getCurrentDateTime(),
    odometer: '',
    description: '',
    destiny: '',
    status: 'input',
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

export default function InputOutputModal({ handleClose, open, setInputOutputs }: InputOutputModalProps) {
  const [isInput, setIsInput] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [lastOdometer, setLastOdometer] = useState<number | null>(null);

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

  const driversLabel = drivers.map((driver: IDriver) => ({
    label: driver.name,
    id: driver._id,
  }));

  
  const prefixLabel = vehicles.map((vehicle: IVehicle) => {
    return { label: vehicle.prefix, id: vehicle._id, status: vehicle.status };
  });

  const handleStatusChange = (event: React.MouseEvent<HTMLElement>, newStatus: string, formikProps: any) => {
    setIsInput(!newStatus);
    newStatus == "input" ? setIsInput(true) : setIsInput(false);
  };

  const handleLastOdometer = async (vehicle: any) => {
    if(vehicle){
      const response = await fetch(`${URL}/api/input-outputs/last-odometer/${vehicle.id}`);
      const data = await response.json()
      setLastOdometer(data.odometer)
    }else{
      setLastOdometer(null)
    }

  }

  const handleSaveData = async (values: any) => {

    console.log('values', values)
    const driverFound =  driversLabel.find((driver) => driver.label.toLowerCase() == values.driver.toLowerCase())
    const prefixFound = prefixLabel.find((prefix) => prefix.label.toLowerCase() == values.vehicle.toLowerCase())
    if(driverFound && prefixFound){
      values.driver = driverFound!.id
      values.vehicle = prefixFound!.id
    } else {
      values.driver = ''
      values.vehicle = ''
    }
    
    try {
      const response = await saveInputOutput(values);
      if(response!.status == 200){
        try{
          await updateVehicleStatus(values.vehicle, values.status);
          toast.success('Dados Salvo com Sucesso!', { theme: "colored" });
          const res = await fetch(`${URL}/api/input-outputs`);
          const data = await res.json();
          console.log(data)
          setInputOutputs(data)
        }catch{
          toast.error('Erro ao salvar dados!', { theme: "colored" });
        }
      } else {
        toast.error('Erro ao salvar dados!', { theme: "colored" });
      }
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar dados!', { theme: "colored" });
    }
  };
  
  const saveInputOutput = async (values: any) => {
    try {
      const response = await axios.post(`${URL}/api/input-outputs`, values);
      return response
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar entrada e saída!', { theme: "colored" });
    }
  };
  
  const updateVehicleStatus = async (vehicleId: string, status: string) => {
    try {
      await axios.put(`${URL}/api/vehicles/${vehicleId}`, { status });
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar veículo', { theme: "colored" });
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
                      freeSolo
                      disablePortal 
                      id="combo-box-demo"
                      options={driversLabel}
                      getOptionLabel={(option) => option.label}
                      onChange={(event, driver) => {
                        formikProps.setFieldValue('driver', driver ? driver.label : '');
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
                      disabled
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
                      freeSolo
                      disablePortal
                      id="combo-box-demo"
                      options={isInput ? prefixLabel.filter(item => item.status == "output") : prefixLabel.filter(item => item.status == "input")}
                      getOptionLabel={(option) => option.label}
                      onChange={(event, vehicle) => {
                        formikProps.setFieldValue('vehicle', vehicle ? vehicle.id : '');
                        handleLastOdometer(vehicle);
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
                      value={isInput ? formikProps.values.odometer : formikProps.values.odometer = lastOdometer?.toString()}
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