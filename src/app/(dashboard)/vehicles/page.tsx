'use client'

import React from 'react'
import { useState } from 'react'
import { Button, SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

    
const Vehicle = () => {
  
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
        Página sobre veículo
      </title>
      
      <Link href={'/vehicles/vehicles-types/register'}>
        <Button
          variant="contained"
          startIcon={(
            <SvgIcon>
              <AddIcon/>
            </SvgIcon>
          )}
          sx={{
            borderRadius: '4px',
          }}
          >
          Novo 
        </Button>
      </Link> 
    </>
  )
}

export default Vehicle