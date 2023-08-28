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
import { useRouter } from 'next/navigation';

const Drivers = () => {
  const { response: drivers, loading, error } = useFetch<IDriver[]>('/api/drivers');
  const router = useRouter()

  const editAction = (params: any) => {
    router.push(`/drivers/${params.id}`)
  }

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      minWidth: 50,
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'full_name',
      headerName: 'Nome Completo',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'active',
      headerName: 'Ativo',
      minWidth: 50,
      type: 'boolean',
      flex: 1
    },
    {
      field: 'enrollment',
      headerName: 'Inscrição',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'created_at',
      headerName: 'Criado em',
      flex: 1,
      minWidth: 180,
      type: 'dateTime',
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: 'updated_at',
      headerName: 'Atualizado em',
      type: 'dateTime',
      minWidth: 180,
      flex: 1,
      valueGetter: ({ value }: any) => value && new Date(value),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      minWidth: 50,
      flex: 1,
      cellClassName: 'actions',  
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
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Drivers;
