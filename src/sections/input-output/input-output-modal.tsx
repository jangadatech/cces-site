import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DialogActions } from '@mui/material';
import getCurrentDateTime from '@/utils/current-date-time';

interface InputOutputModalProps {
  handleClose: () => void;
  open: boolean;
}

const inputOutputInit = {
    driver: '',
    datetime_input: '',
    datetime_output: '',
    odometer: '',
    prefix: '',
    description: '',
    destiny: '',
    travelled_distance: '',
    status: 'E', // Inicialmente, definimos o status como 'Entrada'
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



export default function InputOutputModal({ handleClose, open }: InputOutputModalProps) {
  const [formData, setFormData] = useState(inputOutputInit);
  const [showDatetimeInput, setShowDatetimeInput] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStatusChange = (event: React.MouseEvent<HTMLElement>, newStatus: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: newStatus,
    }));
    setShowDatetimeInput(newStatus === 'E');
  };

  const handleSaveData = () => {
    console.log('Dados do formulário:', formData);
    handleClose();
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
          <form>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <ToggleButtonGroup
                  fullWidth
                  value={formData.status}
                  exclusive
                  onChange={handleStatusChange}
                  aria-label="Status"
                >
                  <ToggleButton value="E" aria-label="Entrada" color='secondary'>
                    Entrada
                  </ToggleButton>
                  <ToggleButton value="S" aria-label="Saída" color='info'>
                    Saída
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Motorista"
                  name="driver"
                  value={formData.driver}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Nome"
                />
              </Grid>
              {showDatetimeInput ? (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Entrada"
                    name="datetime_input"
                    type="datetime-local"
                    value={formData.datetime_input || getCurrentDateTime()}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Date and Time of Input"
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Saída"
                    name="datetime_output"
                    type="datetime-local"
                    value={formData.datetime_output || getCurrentDateTime()}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Date and Time of Output"
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Odometer"
                  name="odometer"
                  type="number"
                  value={formData.odometer}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Odometer"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prefix"
                  name="prefix"
                  value={formData.prefix}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Prefix"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Description"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destiny"
                  name="destiny"
                  value={formData.destiny}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Destiny"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Travelled Distance"
                  name="travelled_distance"
                  type="number"
                  value={formData.travelled_distance}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Travelled Distance"
                />
              </Grid>
            </Grid>
          </form>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveData} variant="contained" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}