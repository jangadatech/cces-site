'use client'

import Link from 'next/link';
import { IUser } from '@/interfaces/IUser';
import useFetch from '@/hook/useFetch';
import { useRouter } from 'next/navigation';

import { 
  Box, 
  Button, 
  Stack, 
  SvgIcon, 
  Typography, 
  Unstable_Grid2 as Grid, 
  Container } from '@mui/material'
import DataTable from '@/components/DataTable';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const Users = () => {
  const { response: users, loading, error } = useFetch<IUser[]>('/api/users');
  const router = useRouter();

  const editAction = (params: any) => {
    router.push(`/users/${params.id}`)
  }

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      minWidth: 50,
      flex: 1
    },
    {
      field: 'username',
      headerName: 'Username',
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
      field: 'profile',
      headerName: 'Perfil',
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
      width: 100,
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
  
  const transformUserData = (users: IUser[]) => {
    console.log(users)
    return users.map((item: IUser) => ({
      id: item._id,
      full_name: item.full_name,
      username: item.username,
      active: item.active,
      profile: item.profile,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  };
  
  const transformedData = users ? transformUserData(users) : [];
  
  return (
    <>
    <title>Usuários | CCES</title>
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
                Usuários
              </Typography>
            </Stack>
            <Link href={'/users/create'}>
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
  )
}

export default Users
