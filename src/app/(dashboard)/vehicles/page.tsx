'use client'

import { Box, Button, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import { Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import DataTable from '@/components/DataTable';

const rows = [
  { id: 1, lastName: 'Snoww', firstName: 'Jon'},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei'},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime'},
  { id: 4, lastName: 'Stark', firstName: 'Arya'},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys'},
  { id: 6, lastName: 'Melisandre', firstName: null,},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara'},
  { id: 8, lastName: 'Frances', firstName: 'Rossini'},
  { id: 9, lastName: 'Roxie', firstName: 'Harvey'},
  { id: 10, lastName: 'Jorge', firstName: 'Rod'},
];

const columns = [
  { field: 'id', 
    headerName: 'ID', 
    width: 90, },
  {
    field: 'firstName',
    headerName: 'Tipo',
    width: 200,
  },
  {
    field: 'lastName',
    headerName: 'Assentos',
    width: 100,
    
  },
];

const Vehicle = () => {
  
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

export default Vehicle