'use client'

import useFetch from '@/hook/useFetch';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import IVehicleType from '@/interfaces/IVehicleType';
import FormVehiclesTypes from '@/sections/vehicles-types/FormVehiclesTypes';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface SearchParamsURL {
  params: {
      id: string;
  };
  searchParams: IVehicleType;
}

const UpdateVehicleType = (url: SearchParamsURL) => {
  const { searchParams, params } = url;
  const data = searchParams;
  const { id } = params;
  const router = useRouter();

  const { response: vehicleType, loading, error, request } = useFetch<IVehicleType>(`/api/vehicles-types/${id}`);

  const inputOutputInit: IVehicleType = {
      name: vehicleType?.name || '',
      seat: vehicleType?.seat || null,
  };

  const handleSubmit = async (values: IVehicleType) => {
    try {
      await request('put', values);
      toast.success('Dados Atualizados com sucesso!', { theme: 'colored' });
      router.push('/vehicles-types');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao Atualizar dados!', { theme: 'colored' });
    }
  };

  return (
    <>
      <title>
        Atualizar Tipo de Veículo | CCES
      </title>
      {vehicleType ? (
        <FormVehiclesTypes handleSubmit={handleSubmit} typeText="Atualizar" initialValues={inputOutputInit} />
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

export default UpdateVehicleType;

