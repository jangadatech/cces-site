'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material'
import BackupIcon from '@mui/icons-material/Backup';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import InputOutputTable from '@/sections/input-output/input-output-table';
import InputOutputModal from '@/sections/input-output/input-output-modal';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import { ToastContainer } from 'react-toastify';
import IInputOutput from '@/interfaces/IInputOutput';
import axios from 'axios';
import { URL } from '@/http/config';

const InputOutput = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useKeyboardShortcut(
    [ "Shift" ,  "N" ], 
    () => handleClickOpen(), 
    {  
      overrideSystem : false , 
      ignoreInputFields : false ,  
      repeatOnHold : false  
    } 
  );

  const [inputOutputs, setInputOutputs] = useState<IInputOutput[]>([]);


  useEffect(() => {

    const fetchInputOutputData = async () => {
      const url = `${URL}/api/input-outputs`;
  
      try {
        const response = await axios.get(url);
        setInputOutputs(response.data);
      } catch (error: any) {
        console.error('Erro na requisição GET:', error.message);
      }
    };

    fetchInputOutputData();
  }, [open]);

  return (
    <>
      <title>
        Entrada e Saída | CCES
      </title>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
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
                  Entrada e Saída
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <BackupIcon />
                      </SvgIcon>
                    )}
                  >
                    Importar
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <DownloadIcon />
                      </SvgIcon>
                    )}
                  >
                    Exportar
                  </Button>
                </Stack>
              </Stack>
              <Stack>
                <div>
                  <Button
                      onClick={handleClickOpen}
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <AddIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                      sx={{
                        borderRadius: '4px',
                      }}
                    >
                      Novo
                  </Button>
                </div>
              </Stack>
            </Stack>
            <InputOutputTable inputOutputs={inputOutputs}/>
          </Stack>
        </Container>
      </Box>
      <InputOutputModal open={open} handleClose={handleClose}/>
    </>
  )
}

export default InputOutput