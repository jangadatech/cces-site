'use client'

import React, { useState } from 'react';
import useFetch from '@/hook/useFetch';
import IVehicle from '@/interfaces/IVehicle';
import FormVehicles from '@/sections/vehicles/FormVehicles';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateVehicle = () => {
  
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const inputOutputInit: IVehicle = {
    plate: '',
    active: true,
    prefix: '',
    vehicle_type_id: '',
}
  const handleSubmit = async (values: any) => {
    try {
      await fetch(`/api/vehicles`, {
        method: 'POST',
        body: JSON.stringify(values),
      })
      toast.success('Dados salvo com sucesso!', { theme: 'colored' });
      router.push('/vehicles')
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
