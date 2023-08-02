import React from 'react'
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams, ptBR } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { ptBR } from '@mui/x-date-pickers/locales';


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
  ];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'Nome',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Sobrenome',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Idade',
      type: 'number',
      width: 110,
      editable: true,
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

  const InputOutputDataGrid = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        initialState={{
            pagination: {
            paginationModel: {
                pageSize: 5,
            },
            },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        />
    </Box>
  )
}

export default InputOutputDataGrid
