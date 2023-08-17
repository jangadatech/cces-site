'use client'


import React from 'react';
import axios from 'axios';
import { URL } from '@/http/config';
import IVehicleType from '@/interfaces/IVehicleType';




const createVehicleType = async (data: IVehicleType) => {
  try{
    const response = await axios.post(`${URL}/api/vehicles-types`, data)
    return response.data
  }
  catch(error: any){
    console.error('Erro ao criar tipo de veículo', error.message)
  }

}

const Register = () => {
  
  return(
    <>
      <title>
        Cadastro de layout
      </title>


    </>
  )
}

export default Register
