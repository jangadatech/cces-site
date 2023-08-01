import React from 'react'
import { DataGrid, GridToolbar,  } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

const UsersTable = () => {
  const data = [
    {
      "id": 0,
      "name": "John Doe",
      "rating": 4.5,
      "country": "USA",
      "dateCreated": "2023-08-01T00:00:00.000Z",
      "isAdmin": false
    },
    {
      "id": 1,
      "name": "Jane Smith",
      "rating": 3.8,
      "country": "Canada",
      "dateCreated": "2023-07-30T00:00:00.000Z",
      "isAdmin": true
    },
    // Add more rows here if needed
  ]
  
  const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100,
  // });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid columns={[]} rows={[]} {...data} slots={{ toolbar: GridToolbar }} />
    </div>
  );
}

export default UsersTable
