import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IVehicle from '@/interfaces/IVehicle';

interface CustomCardProps{
  title: string;
  vehicles: IVehicle[];
}

export default function CustomCard({title, vehicles}: CustomCardProps) {
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
        {
          vehicles.map(item => (
            <Card
            key={item._id}
              sx={{
                width: '100%', 
                height: '100%', 
                padding: 1,
                marginY: 1
              }}
            >
            <Typography variant="h6">
              {item.prefix}
            </Typography>
          </Card>
          ))
        }
      </CardContent>
    </Card>
  );
}