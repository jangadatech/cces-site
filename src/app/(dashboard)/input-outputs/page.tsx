'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Chip, Container, Stack, SvgIcon, Typography } from '@mui/material'
import BackupIcon from '@mui/icons-material/Backup';
import DownloadIcon from '@mui/icons-material/Download';
import InputOutputModal from '@/sections/input-output/input-output-modal';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import { ToastContainer } from 'react-toastify';
import IInputOutput from '@/interfaces/IInputOutput';
import DataTable from '@/components/DataTable';
import useFetch from '@/hook/useFetch';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useRouter } from 'next/navigation';
import { URL } from '@/http/config';

const InputOutput = () => {

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [inputOutputs, setInputOutputs] = useState<IInputOutput[]>();
  const [status, setStatus] = useState('');

  const handleClickOpen = (direction: any) => {
    setStatus(direction);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getInputOutput = async () => {
      const res = await fetch(`${URL}/api/input-outputs`);
      const data = await res.json();
      setInputOutputs(data)
    }
    getInputOutput()
  }, [])
  
  useKeyboardShortcut(
    [ "Shift" ,  "E" ], 
    () => handleClickOpen('input'), 
    {  
      overrideSystem : false , 
      ignoreInputFields : false ,  
      repeatOnHold : false  
    } 
  );

  useKeyboardShortcut(
    [ "Shift" ,  "S" ], 
    () => handleClickOpen('output'), 
    {  
      overrideSystem : false , 
      ignoreInputFields : false ,  
      repeatOnHold : false  
    } 
  );

  const editAction = (params: any) => {
    router.push(`/input-outputs/${params.id}`)
  }

  const useFlexGrow = inputOutputs && inputOutputs.length > 0;

  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      minWidth: 50,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'driver',
      headerName: 'Motorista',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center' 
    },
    {
      field: 'vehicle',
      headerName: 'Prefixo',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center' 
    },
    {
      field: 'odometer',
      headerName: 'Ôdometro',
      minWidth: 50,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center' 
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 50,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        const isInput = params.value === "input";
        return <Chip icon={isInput ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}  label={isInput? "Entrada": "Saída"} variant={"filled"} color={isInput ? "secondary" : "info"} />;
      }
    },
    {
      field: 'destination',
      headerName: 'Destino',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'description',
      headerName: 'Descrição',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center' 
    },
    {
      field: 'register_at',
      headerName: 'Registrado em',
      flex: useFlexGrow ? 1 : undefined,
      minWidth: 100,
      type: 'dateTime',
      align: 'center',
      headerAlign: 'center',
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: 'created_at',
      headerName: 'Criado em',
      flex: useFlexGrow ? 1 : undefined ,
      minWidth: 180,
      type: 'dateTime',
      align: 'center',
      headerAlign: 'center',
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: 'updated_at',
      headerName: 'Atualizado em',
      type: 'dateTime',
      minWidth: 180,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center',
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',
      align: 'center',
      headerAlign: 'center',
      getActions: (params: any) => [
        <GridActionsCellItem
          key={0}
          icon={<EditIcon />}
          label="Editar"
          onClick={() => editAction(params)}
          showInMenu
        />,
        // <GridActionsCellItem
        //   key={1}
        //   icon={<DeleteIcon />}
        //   label="Deletar"
        //   showInMenu
        // />
      ]
    }
  ];

  const transformVehicleData = (inputOutput: IInputOutput[]) => {
    return inputOutput.map((item: IInputOutput) => ({
      id: item._id,
      status: item.status,
      driver: item.driver?.name,
      vehicle: item.vehicle?.prefix,
      odometer: item.odometer,
      destination: item.destination,
      register_at: item.register_at,
      created_at: item.created_at,
      updated_at: item.updated_at
    }));
  };
  
  const transformedData = inputOutputs ? transformVehicleData(inputOutputs) : [];

  console.log('status', status);

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
            <DataTable  columns={columns} rows={transformedData} columnVisibilityModel={{ id: false, created_at: false }} />
          </Stack>
        </Container>
      </Box>
      <InputOutputModal open={open} handleClose={handleClose} setInputOutputs={setInputOutputs} status={status}/>
    </>
  )
}

export default InputOutput