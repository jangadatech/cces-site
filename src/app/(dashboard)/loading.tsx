import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{           
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center' 
    }}>
      <CircularProgress />
    </Box>
  )
}