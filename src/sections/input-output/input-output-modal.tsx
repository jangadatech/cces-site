import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Autocomplete, DialogActions, TextareaAutosize } from '@mui/material';
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

const drivers = [
  { label: 'João' },
  { label: 'Almeida' },
  { label: 'Lúcio' },
  { label: 'Maranhão' },
  { label: 'Ronaldo' },
  { label: 'Juan' },
  { label: 'Birola' }
]

const prefix = [
  { label: '105' },
  { label: '314' },
  { label: '302' },
  { label: '220' },
  { label: '325' },
  { label: '500' },
  { label: '111' }
]



export default function InputOutputModal({ handleClose, open }: InputOutputModalProps) {
  const [formData, setFormData] = useState(inputOutputInit);
  const [showDatetimeInput, setShowDatetimeInput] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={drivers}
                  getOptionLabel={(option) => option.label} // Define o campo usado como label na lista de opções
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Motorista"
                      name="driver"
                      value={formData.driver}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Nome"
                    />
                  )}
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
                    placeholder="Entrada"
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
                    placeholder="Saída"
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={prefix}
                  getOptionLabel={(option) => option.label} // Define o campo usado como label na lista de opções
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Prefixo"
                      name="prefix"
                      value={formData.prefix}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Prefixo"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Odômetro"
                  name="odometer"
                  type="text"
                  value={formData.odometer}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Odometer"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destino"
                  name="destiny"
                  value={formData.destiny}
                  onChange={handleChange}
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
                  value={formData.description}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '', borderRadius: '4px' }}
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