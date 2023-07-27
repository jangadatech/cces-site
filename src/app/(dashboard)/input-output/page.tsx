'use client'

import { useState } from 'react'
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material'
import BackupIcon from '@mui/icons-material/Backup';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { theme } from '@/themes';
import InputOutputTable from '@/sections/input-output/input-output-table';
import InputOutputModal from '@/sections/input-output/input-output-modal';

const inputOutput = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <title>
        Entrada e Saída | CCES
      </title>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
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
                  Entrada e Saída
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
              <Stack>
                <div>
                  <Button
                      onClick={handleClickOpen}
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <AddIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                      sx={{
                        backgroundColor: theme.colors.neutral_800,
                        '&:hover': {
                          backgroundColor: theme.colors.neutral_700,
                        },
                        borderRadius: '4px',
                      }}
                    >
                      Novo
                  </Button>
                </div>
              </Stack>
            </Stack>
            <InputOutputTable />
            {/* <Coponent Aqui Dentro /> */}
          </Stack>
        </Container>
      </Box>
      <InputOutputModal open={open} handleClose={handleClose}/>
    </>
  )
}

export default inputOutput