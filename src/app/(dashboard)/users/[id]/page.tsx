'use client'

import React from 'react';
import useFetch from '@/hook/useFetch';
import { IUser } from '@/interfaces/IUser';
import FormUsers from '@/sections/users/FormUsers';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

interface SearchParamsURL {
  params: {
      id: string;
  };
  searchParams: IUser;
}

const UpdateUser = (url: SearchParamsURL) => {
  const { params } = url;
  const { id } = params;
  const router = useRouter();

  const { response: user, loading, error, request } = useFetch<IUser>(`/api/users/${id}`);

  const inputOutputInit: IUser = {
      username: user?.username || '',
      full_name: user?.full_name || '',
      profile: user?.profile || '',
      active: user?.active || false
  };

  const handleSubmit = async (values: IUser) => {
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
        Atualizar Motorista | CCES
      </title>
      {user ? (
        <FormUsers handleSubmit={handleSubmit} typeText="Atualizar" initialValues={inputOutputInit} />
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

export default UpdateUser;

