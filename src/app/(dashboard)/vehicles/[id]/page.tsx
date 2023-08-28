'use client'

import useFetch from '@/hook/useFetch';
import React from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import IVehicle from '@/interfaces/IVehicle';
import FormVehicles from '@/sections/vehicles/FormVehicles';

interface SearchParamsURL {
  params: {
      id: string;
  };
  searchParams: IVehicle;
}

const UpdateDriver = (url: SearchParamsURL) => {
  const { searchParams, params } = url;
  const data = searchParams;
  const { id } = params;
  const router = useRouter();

  const { response: vehicle, loading, error, request } = useFetch<IVehicle>(`/api/vehicles/${id}`);

  const inputOutputInit: IVehicle = {
      plate: vehicle?.plate || '',
      active: vehicle?.active || null,
      prefix: vehicle?.prefix || '',
      vehicle_type: vehicle?.vehicle_type || '',
  };

  const handleSubmit = async (values: IVehicle) => {
    try {
      await request('put', values);
      toast.success('Dados Atualizados com sucesso!', { theme: 'colored' });
      router.push('/vehicles');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao Atualizar dados!', { theme: 'colored' });
    }
  };

  return (
    <>
      <title>
        Atualizar Motorista | CCES
      </title>
      {vehicle ? (
        <FormVehicles handleSubmit={handleSubmit} typeText="Atualizar" initialValues={inputOutputInit} />
      ) : (
        <Box sx={{           
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center' 
        }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default UpdateDriver;

