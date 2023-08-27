import { useState } from 'react'
import {
  DataGrid, 
  GridColDef, 
  GridToolbar, 
} from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface DataTableProps{
  rows: Array<{[key: number]: string | number }>
  columns: GridColDef[],
}

const DataTable = ({rows, columns}: DataTableProps) => {

  return (
    <Box sx={{ width: '100%', justifyContent: 'center'}}>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        initialState={{
            pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default DataTable