'use client'

import useFetch from '@/hook/useFetch';
import IVehicle from '@/interfaces/IVehicle';
import IVehicleType from '@/interfaces/IVehicleType';
import FormVehicles from '@/sections/vehicles/FormVehicles';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '@/contexts/MyContext';



const CreateVehicle = () => {

  
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { response: drivers, request } = useFetch<IVehicle[]>('/api/vehicles');

  const inputOutputInit: IVehicle = {
    plate: '',
    active: true,
    prefix: '',
    vehicle_type_id: '',
}
  const handleSubmit = async (values: any) => {
    try {
      const res = await fetch(`/api/vehicles`, {
        method: 'POST',
        body: JSON.stringify(values),
      })
      const data =  await res.json()

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
