'use client'

import React, { useEffect, useState } from 'react';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import IInputOutput from '@/interfaces/IInputOutput';
import FormInputOutput from '@/sections/input-output/FormInputOutput';
import IDriver from '@/interfaces/IDriver';
import IVehicle from '@/interfaces/IVehicle';
import { URL } from '@/http/config';
import { Status } from '@/enum/Status';

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

  const [inputOutput, setInputOutput] = useState<IInputOutput>();

  useEffect(() => {
    const getInputOutput = async () => {
      const res = await fetch(`${URL}/api/input-outputs/${id}`);
      const data = await res.json();
      setInputOutput(data)
    }
    getInputOutput()
  }, [])

  const inputOutputInit: IInputOutput = {
    status: inputOutput?.status as string,
    description: inputOutput?.description as string,
    destination: inputOutput?.destination as string,
    driver: inputOutput?.driver as IDriver,
    vehicle: inputOutput?.vehicle as IVehicle,
    odometer: inputOutput?.odometer as string,
  };

  const updateInputOutput = async (id: string, values: IInputOutput) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
  
    await fetch(`${URL}/api/input-outputs/${id}`, requestOptions);
  };

  const updateVehicle = async (vehicle: IVehicle) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicle),
    };
  
    await fetch(`${URL}/api/vehicles/${vehicle._id}`, requestOptions);
  };

  const handleSubmit = async (values: IInputOutput) => {
    try {
      const { vehicle, status } = values;
      vehicle.status = status as Status;
  
      await updateInputOutput(id, values);
      await updateVehicle(vehicle);
  
      toast.success('Dados Atualizados com sucesso!', { theme: 'colored' });
      router.push('/input-outputs');
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