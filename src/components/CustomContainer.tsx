
import React from 'react'
import { 
  Box, 
  Stack, 
  Typography, 
  Unstable_Grid2 as Grid, 
  Container } from '@mui/material'

interface ContainerProps{
  children: React.ReactNode,
  title: string
}

const CustomContainer = ({children, title}: ContainerProps) => {
  return (
    <>  
      <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={false}>
        <Stack spacing={3} >
          <Stack spacing={1} >
            <Typography variant="h4" className="title-bold">
              {title}
            </Typography>
          </Stack>
            <Stack direction="row">
              {children}
            </Stack>
        </Stack>
      </Container>
    </Box>

    </>
  )
}

export default CustomContainer