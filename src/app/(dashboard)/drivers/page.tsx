'use client'
import React from 'react';

import {
  Box,
  Button,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { Container } from '@mui/material';

import Link from 'next/link';
import DataTable from '@/components/DataTable';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import IDriver from '@/interfaces/IDriver';
import useFetch from '@/hook/useFetch';

const createAction = (params: any) => {
  const data = params.row
  delete data.id;
  return (
    <>
      <Link href={{
          pathname: `/drivers/${params.id}`,
          query: data
        }}
        >
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          sx={{
            color: 'primary.main',
          }}
        />
      </Link>
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        sx={{
          color: 'primary.main',
        }}
      />
    </>
  );
};

const columns = [
  { field: 'id', 
    headerName: 'ID', 
    width: 90,
    hideable: false
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 200,
  },
  {
    field: 'full_name',
    headerName: 'Nome Completo',
    width: 200,
  },
  {
    field: 'active',
    headerName: 'Ativo',
    width: 200,
  },
  {
    field: 'enrollment',
    headerName: 'Inscrição',
    width: 200,
  },
  {
    field: 'created_at',
    headerName: 'Criado em',
    width: 200,
  },
  {
    field: 'updated_at',
    headerName: 'Atualizado em',
    width: 200,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Ações',
    width: 100,
    cellClassName: 'actions',  
    renderCell: (params: any) => createAction(params)

  }
];

const Drivers = () => {
  const { response: drivers, loading, error } = useFetch<IDriver[]>('/api/drivers');

  const transformDriverData = (drivers: IDriver[]) => {
    return drivers.map((item: IDriver, index: number) => ({
      id: item._id,
      name: item.name,
      full_name: item.full_name,
      active: item.active,
      enrollment: item.enrollment,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  };

  const transformedData = drivers ? transformDriverData(drivers) : [];

  return (
    <>
      <title>Motoristas | CCES</title>
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
                  Motoristas
                </Typography>
              </Stack>
              <Link href={'/drivers/create'}>
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
              columnVisibilityModel={{id: false, full_name: false, updated_at: false}}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Drivers;
