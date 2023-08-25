'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Stack, 
  SvgIcon, 
  Typography, 
  Unstable_Grid2 as Grid 
} from '@mui/material'
import { Container } from '@mui/material';

import Link from 'next/link';
import DataTable from '@/components/DataTable';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import IDriver from '@/interfaces/IDriver';

const createAction = (id: any) => {
  return (
    <>
      <Link href={`/drivers/${id}`}>
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        sx={{
            color: 'primary.main',
          }}
        />
      </Link>
      <GridActionsCellItem
        icon={<DeleteIcon/>}
        label="Delete"
        sx={{
          color: 'primary.main',
        }}
      />
    </> 
  )
}

const columns = [
  { field: 'id', 
    headerName: 'ID', 
    width: 90, },
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
    renderCell: (params: any) => createAction(params.id)

  }
];

const Drivers = () => {

  const [drivers, setDrivers] = useState<IDriver[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  
  const fetchDrivers = async () => {
    try {
      const response = await axios.get('/api/drivers');
      return response.data;
    } catch (error: any) {
      throw new Error('Erro ao listar tipos de veículos: ' + error.message);
    }
  };

  const transformDriverData = (drivers: any) => {
    return drivers.map((item: IDriver, index: number) => ({
      id: index + 1,
      name: item.name,
      full_name: item.full_name,
      active: item.active,
      enrollment: item.enrollment,
      created_at: item.created_at,
      updated_at: item.updated_at
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversData = await fetchDrivers();
        setDrivers(driversData);
        const transformedData = transformDriverData(driversData)
        console.log(transformedData)
        setRows(transformedData)
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>   
      <title>
        Motoristas
      </title>
    
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
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
                    Motoristas
                </Typography>
              </Stack>
              <Link href={'/drivers/form'}>
                <Button
                  variant="contained"
                  startIcon={(
                    <SvgIcon>
                      <AddIcon/>
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
            <DataTable rows={rows} columns={columns}/>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Drivers