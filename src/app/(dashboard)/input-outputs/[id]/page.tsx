'use client'

import React from 'react';
import useFetch from '@/hook/useFetch';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import IInputOutput from '@/interfaces/IInputOutput';
import FormInputOutput from '@/sections/input-output/FormInputOutput';
import IDriver from '@/interfaces/IDriver';
import IVehicle from '@/interfaces/IVehicle';

interface SearchParamsURL {
  params: {
      id: string;
  };
  searchParams: IInputOutput;
}

const UpdateInputOutput = (url: SearchParamsURL) => {
  const { params } = url;
  const { id } = params;
  const router = useRouter();

  const { response: inputOutput, loading, error, request } = useFetch<IInputOutput>(`/api/input-outputs/${id}`);

  const inputOutputInit: IInputOutput = {
    status: inputOutput?.status as string,
    description: inputOutput?.description as string,
    destiny: inputOutput?.destiny as string,
    driver: inputOutput?.driver as IDriver,
    vehicle: inputOutput?.vehicle as IVehicle,
    odometer: inputOutput?.odometer as string,
  };

  const handleSubmit = async (values: IInputOutput) => {
    try {
      await request('put', values);
      toast.success('Dados Atualizados com sucesso!', { theme: 'colored' });
      router.push('/users');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao Atualizar dados!', { theme: 'colored' });
    }
  };

  return (
    <>
      <title>
        Atualizar Entrada e Saída | CCES
      </title>
      {inputOutput ? (
        <FormInputOutput handleSubmit={handleSubmit} typeText="Atualizar" initialValues={inputOutputInit} />
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

export default UpdateInputOutput;

