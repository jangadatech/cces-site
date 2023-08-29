'use client'

import useFetch from '@/hook/useFetch';
import IVehicleType from '@/interfaces/IVehicleType';
import FormVehiclesTypes from '@/sections/vehicles-types/FormVehiclesTypes';
import FormVehicles from '@/sections/vehicles/FormVehicles';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateVehicleType = () => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { response: drivers, request } = useFetch<IVehicleType[]>('/api/vehicles-types');

  const inputOutputInit: IVehicleType = {
    name: '',
    seat: null,
}

  const handleSubmit = async (values: any) => {
    try {
      await request('post', values);
      toast.success('Dados salvo com sucesso!', { theme: 'colored' });
      router.push('/vehicles-types')
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
      <FormVehiclesTypes handleSubmit={handleSubmit} typeText="Cadastrar" initialValues={inputOutputInit} />;
    </>
  )
};

export default CreateVehicleType;
