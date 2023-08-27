'use client'

import useFetch from '@/hook/useFetch';
import IDriver from '@/interfaces/IDriver';
import FormDrivers from '@/sections/drivers/FormDrivers';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

interface SearchParamsURL {
  params: {
      id: string;
  };
  searchParams: IDriver;
}

const UpdateDriver = (url: SearchParamsURL) => {
  const { searchParams, params } = url;
  const data = searchParams;
  const { id } = params;
  const router = useRouter();

  const { response: driver, loading, error, request } = useFetch<IDriver>(`/api/drivers/${id}`);

  const inputOutputInit = {
    name: driver?.name || '',
    full_name: driver?.full_name || '',
    enrollment: driver?.enrollment || ''
  };

  const handleSubmit = async (values: IDriver) => {
    try {
      await request('put', values);
      toast.success('Dados Atualizados com sucesso!', { theme: 'colored' });
      router.push('/drivers');
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
      {driver ? (
        <FormDrivers handleSubmit={handleSubmit} typeText="Atualizar" initialValues={inputOutputInit} />
      ) : (
        <Box sx={{           
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

