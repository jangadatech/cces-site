'use client'

import useFetch from '@/hook/useFetch';
import IVehicle from '@/interfaces/IVehicle';
import FormVehicles from '@/sections/vehicles/FormVehicles';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateVehicle = () => {

  const router = useRouter();

  const inputOutputInit: IVehicle = {
      plate: '',
      active: true,
      prefix: '',
      vehicle_type: '',
  }

  const [isLoading, setIsLoading] = useState(false);
  const { response: drivers, loading, error, request } = useFetch<IVehicle[]>('/api/vehicles');


  const handleSubmit = async (values: any) => {
    try {
      await request('post', values);
      toast.success('Dados salvo com sucesso!', { theme: 'colored' });
      router.push('/drivers')
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar dados!', { theme: 'colored' });
    }
    setIsLoading(false);
  };

  return (
    <>
      <title>
        Cadastrar Veículo | CCES
      </title>
      <FormVehicles handleSubmit={handleSubmit} typeText="Cadastrar" initialValues={inputOutputInit} />;
    </>
  )
};

export default CreateVehicle;
