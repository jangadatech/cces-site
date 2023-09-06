'use client'

import useFetch from '@/hook/useFetch';
import IDriver from '@/interfaces/IDriver';
import FormDrivers from '@/sections/drivers/FormDrivers';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateDriver = () => {

  const router = useRouter();

  const inputOutputInit: IDriver = {
    name: '',
    full_name: '',
    enrollment: '',
  }

  const [isLoading, setIsLoading] = useState(false);
  const { response: drivers, loading, error, request } = useFetch<IDriver[]>('/api/drivers');


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
        Cadastrar Motorista | CCES
      </title>
      <FormDrivers handleSubmit={handleSubmit} typeText="Cadastrar" initialValues={inputOutputInit} />;
    </>
  )
};

export default CreateDriver;
