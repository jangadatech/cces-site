'use client'

import React from 'react'
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material'
import BackupIcon from '@mui/icons-material/Backup';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import InputOutputTable from '@/components/input-outputTable';
import palette from '@/themes/palette';

const inputOutput = () => {
  return (
    <>
      <title>
        Usuários | CCES
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
                <Typography variant="h4">
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
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <AddIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                      sx={{
                        backgroundColor: palette.background.dark,
                        '&:hover': {
                          backgroundColor: palette.background.dark,
                        },
                        borderRadius: '8px',
                        textTransform: 'none'
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
    </>
  )
}

export default inputOutput
