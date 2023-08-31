'use client'

import { useState } from 'react'
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material'
import BackupIcon from '@mui/icons-material/Backup';
import DownloadIcon from '@mui/icons-material/Download';
import InputOutputModal from '@/sections/input-output/input-output-modal';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import { ToastContainer } from 'react-toastify';
import IInputOutput from '@/interfaces/IInputOutput';
import DataTable from '@/components/DataTable';
import useFetch from '@/hook/useFetch';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InputOutput = () => {

  const { response: inputOutputs, loading, error } = useFetch<IInputOutput[]>('/api/input-outputs');

  console.log(inputOutputs)

  // const [inputOutputs, setInputOutputs] = useState<IInputOutput[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useKeyboardShortcut(
    [ "Shift" ,  "N" ], 
    () => handleClickOpen(), 
    {  
      overrideSystem : false , 
      ignoreInputFields : false ,  
      repeatOnHold : false  
    } 
  );

  // useEffect(() => {

  //   const fetchInputOutputData = async () => {
  //     const url = `${URL}/api/input-outputs`;
  
  //     try {
  //       const response = await axios.get(url);
  //       setInputOutputs(response.data);
  //     } catch (error: any) {
  //       console.error('Erro na requisição GET:', error.message);
  //     }
  //   };

  //   fetchInputOutputData();
  // }, [open]);

  const useFlexGrow = inputOutputs && inputOutputs.length > 0;

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      minWidth: 50,
      flex: useFlexGrow ? 1 : undefined 
    },
    {
      field: 'driver',
      headerName: 'Motorista',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined 
    },
    {
      field: 'register_at',
      headerName: 'Registro',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined 
    },
    {
      field: 'odometer',
      headerName: 'Ôdometro',
      minWidth: 50,
      flex: useFlexGrow ? 1 : undefined 
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 50,
      flex: useFlexGrow ? 1 : undefined 
    },
    {
      field: 'destiny',
      headerName: 'Destino',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined 
    },
    {
      field: 'description',
      headerName: 'Descrição',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined 
    },
    {
      field: 'created_at',
      headerName: 'Criado em',
      flex: useFlexGrow ? 1 : undefined ,
      minWidth: 180,
      type: 'dateTime',
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: 'updated_at',
      headerName: 'Atualizado em',
      type: 'dateTime',
      minWidth: 180,
      flex: useFlexGrow ? 1 : undefined ,
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',  
      getActions: (params: any) => [
        <GridActionsCellItem
          key={0}
          icon={<EditIcon />}
          label="Editar"
          // onClick={() => editAction(params)}
          showInMenu
        />,
        <GridActionsCellItem
          key={1}
          icon={<DeleteIcon />}
          label="Deletar"
          showInMenu
        />
      ]
    }
  ];

  const transformVehicleData = (inputOutput: IInputOutput[]) => {
    return inputOutput.map((item: IInputOutput) => ({
      id: item._id,
      status: item.status,
      driver: item.driver?.name,
      vehicle: item.vehicle.prefix,
      odometer: item.odometer,
      destiny: item.destiny,
      register_at: item.register_at,
      created_at: item.created_at,
      updated_at: item.updated_at
    }));
  };
  
  const transformedData = inputOutputs ? transformVehicleData(inputOutputs) : [];

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
            <DataTable  columns={columns} rows={transformedData} />
            {/* <InputOutputTable inputOutputs={inputOutputs}/> */}
          </Stack>
        </Container>
      </Box>
      <InputOutputModal open={open} handleClose={handleClose}/>
    </>
  )
}

export default InputOutput