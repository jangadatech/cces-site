'use client'

import { Box, Button, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import { Container } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import UsersTable from '@/components/UsersTable';
import Link from 'next/link';
import { theme } from '@/themes';
import InputOutputGataGrid from '@/sections/input-output/input-output-data-grid';
import DataTable from '@/components/DataTable';
import { GridValueGetterParams} from '@mui/x-data-grid';

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Jorge', firstName: 'Rod', age: 67 },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'Nome',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Sobrenome',
    width: 150,
  },
  {
    field: 'age',
    headerName: 'Idade',
    type: 'number',
    width: 110,
  },
  {
    field: 'fullName',
    headerName: 'Nome Completo',
    description: 'Essa coluna não pode ser ordenada.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
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