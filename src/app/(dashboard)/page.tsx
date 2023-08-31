'use client'

import { useEffect, useState } from "react";
import CustomCard from "@/components/CustomCard"
import CustomContainer from '@/components/CustomContainer';
import IVehicleType from "@/interfaces/IVehicleType";

const getVehiclesTypesData = async () => {
  const response = await fetch('/api/vehicles-types')
  const data = await response.json()
  return data;
}

export default function Home() {

  const [vehiclesTypes, setVehiclesTypes] = useState<IVehicleType[]>([]);

  useEffect(() => {
    const fetchVehiclesTypesData = async () => {
      const data = await getVehiclesTypesData()
      setVehiclesTypes(data);
    }
    fetchVehiclesTypesData();
  }, [])

    return (
    <>
      <title>
        Dasboard | CCESS
      </title>
      <CustomContainer title="Dashboard - Pátio">
      {
        vehiclesTypes.map((item) => (
            <CustomCard
              key={item._id}
              title={item.name}
              subtitle={'Prefixo'}
            />
          
        ))
      }
      </CustomContainer>
    </>
  )
}
