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
import IVehicleType from '@/interfaces/IVehicleType';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';


const createAction = () => {
  return (
    <>
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        sx={{
          color: 'primary.main',
        }}
        
      />
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
    renderCell: () => createAction()

  }
];

const VehiclesTypes = () => {

  const [rows, setRows] = useState([]);
  
  const getAllVehiclesTypes = async () => {
    try{
      const { data } = await axios.get('/api/vehicles-types')
  
      const rows = data.map((item: IVehicleType, index: number) =>{

        return {
          id: index,
          name: item.name,
          seat: item.seat,
        }
      })

      setRows(rows);
    }
    catch(error: any){
      console.log('Erro ao lista tipos de veículos', error.message);
    }
  }
  
  const updateVehicleType = async (id = 1) => {
    try{
      const { data } = await axios.put(`/api/vehicles-types/${id}`)
      console.log(data);
    }
    catch(error: any){
      console.log('Erro ao atualizar tipo de veículo', error.message);
    }
  }

  useEffect(() =>{
    getAllVehiclesTypes();
  },[])
  
  return (
    <>   
      <title>
        Tipos
      </title>
    
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
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
              <Link href={'/vehicles/vehicles-types/register'}>
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

export default VehiclesTypes