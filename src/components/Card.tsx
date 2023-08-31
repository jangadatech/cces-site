import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard() {
  return (
    <Card 
      sx={{ 
        width: '100%', 
        height: '100%', 
        boxShadow: 5,
        margin: 1
      }}
    >
      <CardContent
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography  component="div" variant="h5">
          Tipo
        </Typography>
        <Card
          sx={{
            width: '100%', 
            height: '100%', 
            bgcolor: 'primary.main', 
            color: 'white',
            padding: 1,
          }}
        >
          <span>Prefixo</span>
        </Card>
      </CardContent>
    </Card>
  );
}