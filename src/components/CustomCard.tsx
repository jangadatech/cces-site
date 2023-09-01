import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CustomCardProps{
  title: string;
  subtitle: string;
}

export default function CustomCard({title, subtitle}: CustomCardProps) {
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
          {title}
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
          {subtitle}
        </Card>
      </CardContent>
    </Card>
  );
}