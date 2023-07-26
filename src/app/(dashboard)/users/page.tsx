'use client'

import { Box, Button, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import { Container } from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import UsersTable from '@/components/UsersTable';
import Link from 'next/link';
import { theme } from '@/themes';

const data = [
  {
    "_id": "64baa362ebd8e91ba780b477",
    "username": "Venilson",
    "password": "12345",
    "profile": "admin",
    "created_at": "2023-07-21T16:30:04.781Z"
  },
  {
    "_id": "64bab28cebd8e91ba780b478",
    "username": "Venilson",
    "password": "12345",
    "profile": "admin",
    "created_at": "2023-07-21T16:30:04.781Z"
  },
  {
    "_id": "64bab669ebd8e91ba780b479",
    "username": "Venilson",
    "password": "",
    "profile": "",
    "created_at": "2023-07-21T16:46:33.264Z"
  },
  {
    "_id": "64bab693ebd8e91ba780b47a",
    "username": "Venilson",
    "password": "",
    "profile": "",
    "created_at": "2023-07-21T16:47:15.521Z"
  },
  {
    "_id": "64babae5a7dffc208a00e392",
    "username": "Venilson1234",
    "password": "123456789",
    "profile": "admin",
    "created_at": "2023-07-21T17:05:41.995Z"
  },
  {
    "_id": "64babfaca556f32e8c88b9be",
    "username": "teste",
    "password": "1234",
    "profile": "Admin",
    "created_at": "2023-07-21T17:26:04.249Z"
  },
  {
    "_id": "64babfc1a556f32e8c88b9bf",
    "username": "teste",
    "password": "13245",
    "profile": "traffic-control",
    "created_at": "2023-07-21T17:26:25.513Z"
  }
]

const Users = () => {
  return (
    <>
      <title>
        Usuários | CCES
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
                <Typography variant="h4">
                  Usuários
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <BackupIcon />
                      </SvgIcon>
                    )}
                  >
                    Importar
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <DownloadIcon />
                      </SvgIcon>
                    )}
                  >
                    Exportar
                  </Button>
                </Stack>
              </Stack>
              <Link href={'/users/register'}>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <AddIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.colors.neutral_800,
                    '&:hover': {
                      backgroundColor: theme.colors.neutral_800,
                    }
                  }}
                >
                  Novo
                </Button>
              </Link>
            </Stack>
            {/* <UsersSearch /> */}
            <UsersTable />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Users
