'use client'

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material'
import Link from 'next/link';
import { Container } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DataTable from '@/components/DataTable';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import IVehicleType from '@/interfaces/IVehicleType';
import {URL} from '@/http/config';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const VehiclesTypes = () => {

  const router = useRouter();
  const [vehiclesTypes, setVehiclesTypes] = useState<IVehicleType[]>([])

  useEffect(() => {
    const getVehicleType = async () => {
      const res = await fetch(`${URL}/api/vehicles-types`);
      const data = await res.json();
      setVehiclesTypes(data)
    }
    getVehicleType()
  }, [])

  const editAction = (id: string) => {
    router.push(`/vehicles-types/${id}`)
  }

  const deleteAction = async (id: string) => {
    const confirmed  =  confirm('Tem certeza de que deseja excluir este tipo de veículo?');
    if(confirmed){
      try {
        const res = await fetch(`${URL}/api/vehicles-types/${id}`, {
          method: 'DELETE',
        });
        toast.success('Dado Deletado com sucesso!', { theme: 'colored' });
        setVehiclesTypes(vehiclesTypes.filter((vehicleType) => vehicleType._id !== id));
      } catch (error) {
        toast.success('erro ao Deletar dado!', { theme: 'colored' });
        console.log('Erro ao deletar tipo de veículo', error);
      }
    }
  };

  const useFlexGrow = vehiclesTypes && vehiclesTypes.length > 0;

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      flex: useFlexGrow ? 1 : undefined 
    },
    {
      field: 'name',
      headerName: 'Tipo',
      width: 200,
      flex: useFlexGrow ? 1 : undefined 
    },
    {
      field: 'seat',
      headerName: 'Assentos',
      width: 100,
      flex: useFlexGrow ? 1 : undefined 
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
          onClick={() => editAction(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key={1}
          icon={<DeleteIcon />}
          label="Deletar"
          onClick={() => deleteAction(params.id)}
          showInMenu
        />
      ]
    }
  ];

  const transformVehicleData = (type: IVehicleType[]) => {
    return type.map((item: IVehicleType) => ({
      id: item._id,
      name: item.name,
      seat: item.seat
    }));
  };
  
  const transformedData = vehiclesTypes ? transformVehicleData(vehiclesTypes) : [];

  return (
    <>
      <title>
        Tipos de Veículos
      </title>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={false}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4" className='title-bold'>
                  Tipos de veículos
                </Typography>
              </Stack>
              <Link href={'/vehicles-types/create'}>
                <Button
                  variant="contained"
                  startIcon={(
                    <SvgIcon>
                      <AddIcon />
                    </SvgIcon>
                  )}
                  sx={{
                    borderRadius: '4px',
                  }}
                >
                  Novo
                </Button>
              </Link>
            </Stack>
            <DataTable rows={transformedData} columns={columns} />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default VehiclesTypes
