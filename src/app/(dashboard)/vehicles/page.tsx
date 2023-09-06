'use client'

import Link from 'next/link';
import useFetch from '@/hook/useFetch';
import { useRouter } from 'next/navigation';

import { 
  Box, 
  Button, 
  Stack, 
  SvgIcon, 
  Typography, 
  Unstable_Grid2 as Grid, 
  Container } from '@mui/material'
import DataTable from '@/components/DataTable';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IVehicle from '@/interfaces/IVehicle';

const Vehicles = () => {
  const { response: vehicles, loading, error } = useFetch<IVehicle[]>('/api/vehicles');
  const router = useRouter();

  const editAction = (params: any) => {
    router.push(`/vehicles/${params.id}`)
  }

  const useFlexGrow = vehicles && vehicles.length > 0;

  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      minWidth: 50,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center', 
    },
    {
      field: 'plate',
      headerName: 'Placa',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center', 
    },
    {
      field: 'prefix',
      headerName: 'Prefixo',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center', 
    },
    {
      field: 'active',
      headerName: 'Ativo',
      minWidth: 50,
      type: 'boolean',
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center', 
    },
    {
      field: 'vehicle_type',
      headerName: 'Tipo de Veículo',
      minWidth: 100,
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center', 
    },
    {
      field: 'created_at',
      headerName: 'Criado em',
      flex: useFlexGrow ? 1 : undefined,
      align: 'center',
      headerAlign: 'center',
      minWidth: 180,
      type: 'dateTime',
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
        <GridActionsCellItem
          key={1}
          icon={<DeleteIcon />}
          label="Deletar"
          showInMenu
        />
      ]
    }
  ];
  
  const transformVehicleData = (vehicles: IVehicle[]) => {
    return vehicles.map((item: IVehicle) => ({
      id: item._id,
      plate: item.plate,
      active: item.active,
      prefix: item.prefix,
      vehicle_type_id: item.vehicle_type_id,
      vehicle_type: item.vehicle_type?.name,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  };
  
  const transformedData = vehicles ? transformVehicleData(vehicles) : [];
  
  return (
    <>
    <title>Veículos | CCES</title>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={false}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4" className="title-bold">
                Veículos
              </Typography>
            </Stack>
            <Link href={'/vehicles/create'}>
              <Button
                variant="contained"
                startIcon={
                  <SvgIcon>
                    <AddIcon />
                  </SvgIcon>
                }
                sx={{
                  borderRadius: '4px',
                }}
              >
                Novo
              </Button>
            </Link>
          </Stack>
          <DataTable 
            rows={transformedData} 
            columns={columns}
            columnVisibilityModel={{ id: false }}
          />
        </Stack>
      </Container>
    </Box>
  </>
  )
}

export default Vehicles