'use client'

import useFetch from '@/hook/useFetch';
import IDriver from '@/interfaces/IDriver';
import FormDrivers from '@/sections/drivers/FormDrivers';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface SearchParamsURL {
  params: {
      id: string;
  };
  searchParams: IDriver;
}

const UpdateDriver = (url: SearchParamsURL) => {

  const { searchParams, params } = url;
  const data = searchParams;
  const {id} = params;

  const inputOutputInit: IDriver = {
    name: data.name,
    full_name: data.full_name,
    enrollment: data.enrollment,
  }

  const [isLoading, setIsLoading] = useState(false);
  const { response: drivers, loading, error, request } = useFetch<IDriver[]>(`/api/drivers/${id}`);

  const handleSubmit = async (values: IDriver) => {
    try {
      // await request('put', values);
      toast.success('Dados Atualizados com sucesso!', { theme: 'colored' });
    } catch (error) {
      console.error(error);
      toast.error('Erro ao Atualizar dados!', { theme: 'colored' });
    }
    setIsLoading(false);
  };

  return (
    <>
      <title>
        Atualizar Motorista | CCES
      </title>
      <FormDrivers handleSubmit={handleSubmit} typeText="Atualizar" initialValues={inputOutputInit} />;
    </>
  )
};

export default UpdateDriver;
