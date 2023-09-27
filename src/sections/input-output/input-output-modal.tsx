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
import isObjectId from '@/utils/isObjectIdUtil';
import { Status } from '@/enum/Status';

interface InputOutputModalProps {
  handleClose: () => void;
  open: boolean;
  status: Status
  inputOutputs?: IInputOutput[] | null,
  setInputOutputs: Dispatch<SetStateAction<IInputOutput[] | undefined>>,
  setStatus: Dispatch<SetStateAction<Status | undefined>>,
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

export default function InputOutputModal({ handleClose, open, setInputOutputs, status, setStatus }: InputOutputModalProps) {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [lastOdometer, setLastOdometer] = useState<number | null>(null);

  const inputOutputInit = {
    driver: '',
    vehicle: '',
    register_at: getCurrentDateTime(),
    odometer: '',
    description: '',
    destination: '',
    status: status,
  }

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
    return { label: driver.name, id: driver._id  };
  });

  const vehicleLabel = vehicles.map((vehicle: IVehicle) => {
    return { label: vehicle.prefix, id: vehicle._id, status: vehicle.status };
  });

  const handleStatusChange = (event: React.MouseEvent<HTMLElement>, newStatus: Status, formikProps: any) => {
    setStatus(newStatus)
  };

  const handleLastOdometer = async (vehicleId: any) => {
    setLastOdometer(null)
    
    if(vehicleId){
      const response = await fetch(`${URL}/api/input-outputs/last-odometer/${vehicleId}`);
      const data = await response.json()
      setLastOdometer(data.odometer)
    }else{
      setLastOdometer(null)
    }

  }

  const handleSaveData = async (values: any) => {

    const {driver, vehicle} = values

    if(!isObjectId(driver)){
      const driverFound = findDriverId(driver)
      values.driver = driverFound
    } 

    if(!isObjectId(vehicle)){
      const vehicleFound = findVehicleId(vehicle)
      values.vehicle = vehicleFound
    } 

    values.register_at = getCurrentDateTime();
    
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

  function findDriverId(driverName: string) {
    const driver = driversLabel.find(
      (driverItem) => driverItem.label.toLowerCase() === driverName.toLowerCase()
    );
    return driver ? driver.id : "not Found";
  }

  function findVehicleId(vehcileName: string) {
    const vehicle =  vehicleLabel.find(
      (vehicleItem) => vehicleItem.label.toLowerCase() === vehcileName.toLowerCase()
    );
    return vehicle ? vehicle.id : "not Found";
  }

  const validateForm = (values: any) => {
    const errors: any = {};
  
    if (!values.driver) {
      errors.driver = 'Campo obrigatório.';
    } else if (!/^[a-zA-Z]+$/.test(values.driver)) {
      console.log('values.driver', values.driver)
      errors.driver = 'Por favor, insira apenas letras no campo nome.';
    }
  
    if (!values.vehicle) {
      errors.vehicle = 'Campo obrigatório.';
    } else if (!/^[0-9]+$/.test(values.vehicle)) {
      errors.vehicle = 'Por favor, insira apenas números no campo veículo.';
    }
  
    if (!values.odometer) {
      errors.odometer = 'Campo obrigatório.';
    } else if (!/^[0-9]+$/.test(values.odometer)) {
      errors.odometer = 'Por favor, insira apenas números no campo odômetro.';
    }
  
    if (!values.destination) {
      errors.destination = 'Campo obrigatório.';
    } else if (!/^[A-Za-z]+$/.test(values.destination)) {
      errors.destination = 'Por favor, insira apenas letras no campo destino.';
    }
  
    if (!values.status) {
      errors.status = 'Campo obrigatório.';
    }
  
    return errors;
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
            validate={validateForm}
          >
            {(formikProps: any)=> (
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
                      <ToggleButton value='input' aria-label="Entrada" color="secondary">
                        Entrada 
                      </ToggleButton>
                      <ToggleButton value='output' aria-label="Saída" color="info">
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
                      onChange={(event, driver) => {
                        //@ts-ignore
                        formikProps.setFieldValue('driver', driver ? driver.label : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Motorista"
                          name="driver"
                          type="text"
                          value={formikProps.values.driver}
                          onChange={formikProps.handleChange}
                          variant="outlined"
                          placeholder="Nome"
                          error={formikProps.touched.driver && Boolean(formikProps.errors.driver)}
                          helperText={formikProps.touched.driver && formikProps.errors.driver}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      freeSolo
                      disablePortal
                      id="combo-box-demo"
                      options={status == Status.INPUT ? vehicleLabel.filter(item => item.status == Status.OUTPUT) : vehicleLabel.filter(item => item.status == Status.INPUT)}
                      onChange={(event, vehicle) => {
                        //@ts-ignore
                        formikProps.setFieldValue('vehicle', vehicle ? vehicle.label : '');
                        //@ts-ignore
                        handleLastOdometer(vehicle.id);
                      }}
                      onBlur={() => {
                        const vehicleId = findVehicleId(formikProps.values.vehicle)
                        handleLastOdometer(vehicleId);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Prefixo"
                          name="vehicle"
                          value={formikProps.values.vehicle.id}
                          onChange={formikProps.handleChange}
                          variant="outlined"
                          placeholder="Prefixo"
                          error={formikProps.touched.vehicle && Boolean(formikProps.errors.vehicle)}
                          helperText={formikProps.touched.vehicle && formikProps.errors.vehicle}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      disabled={status == Status.INPUT ? false : true}
                      label={"Odômetro"}
                      name="odometer"
                      value={status == Status.INPUT ? formikProps.values.odometer : formikProps.values.odometer = lastOdometer?.toString()}
                      onChange={formikProps.handleChange}
                      variant="outlined"
                      placeholder="Odometer"
                      error={formikProps.touched.odometer && Boolean(formikProps.errors.odometer)}
                      helperText={formikProps.touched.odometer && formikProps.errors.odometer}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Destino"
                      name="destination"
                      value={formikProps.values.destination}
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
                  <Button onClick={() => {
                    handleClose()
                    setLastOdometer(null)
                  }} color="primary">
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