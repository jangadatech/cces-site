'use client'

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

async function getVehicleTypes() {
  const res = await fetch(`${URL}/api/vehicles-types`)
  return res.json()
}

const VehiclesTypes = () => {

  const router = useRouter();
  // const vehicleTypeData = await getVehicleTypes();

  // const rows = vehicleTypeData.map((item: IVehicleType) =>{

  //   return {
  //     id: item._id,
  //     name: item.name,
  //     seat: item.seat,
  //   }
  // })

  const editAction = (id: string) => {
    router.push(`/vehicles/vehicles-types/${id}`)
  }

  const deleteAction = async (id: string) => {
    try {
      const res = await fetch(`/api/vehicles-types/${id}`, {
        method: 'DELETE',
      });

      console.log(res.json())
    } catch (error) {
      console.log('Erro ao deletar tipo de veículo', error);
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'name',
      headerName: 'Tipo',
      width: 200,
    },
    {
      field: 'seat',
      headerName: 'Assentos',
      width: 100,

    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',
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
              <Link href={'/vehicles/vehicles-types'}>
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
            <DataTable rows={[]} columns={columns} />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default VehiclesTypes
