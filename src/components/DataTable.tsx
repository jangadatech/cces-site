import { useState } from 'react'
import {
  DataGrid, 
  GridColDef, 
  GridToolbar,
  ptBR
} from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface DataTableProps{
  rows: Array<{[key: number]: string | number }>
  columns: GridColDef[],
  columnVisibilityModel?: any
}

const DataTable = ({rows, columns, columnVisibilityModel}: DataTableProps) => {

  return (
    <Box sx={{ width: '100%', justifyContent: 'center'}}>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        density="compact"
        initialState={{
            pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        disableRowSelectionOnClick
        columnVisibilityModel={columnVisibilityModel}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  )
}

export default DataTable