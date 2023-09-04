'use client'

import CustomCard from "@/components/CustomCard";
import CustomContainer from "@/components/CustomContainer";
import IVehicle, { StatusVehicle } from "@/interfaces/IVehicle";
import IVehicleTypeMap from "@/interfaces/IVehicleTypeMap";
import { useEffect, useState } from "react";

const getVehiclesData = async () => {
  const response = await fetch('/api/vehicles')
  const data = await response.json()
  return data;
}

export default function Home() {

  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  useEffect(() => {
    const fetchVehiclesData = async () => {
      const data = await getVehiclesData()
      setVehicles(data);
    }
    fetchVehiclesData();
  }, [])

    const vehiclesFiltered = vehicles.filter(vehicle => vehicle.status === StatusVehicle.INPUT && vehicle.active == true);

    const vehicleTypeMap: IVehicleTypeMap = {};

    vehiclesFiltered.forEach(vehicle => {
      const type = vehicle.vehicle_type!.name;
    
      if (!vehicleTypeMap[type]) {
        vehicleTypeMap[type] = { vehicle_type: type, vehicles: [] };
      }
    
      vehicleTypeMap[type].vehicles.push(vehicle);
    });
    
    const groupedVehicles = Object.values(vehicleTypeMap);
    
    console.log(groupedVehicles);

    return (
    <>
      <title>
        Dasboard | CCES
      </title>

      <CustomContainer title="Dashboard - Pátio">
        {
          groupedVehicles.map((item) => (
            <CustomCard
              key={item.vehicle_type}
              title={item.vehicle_type}
              vehicles={item.vehicles}
            />
          ))
        }
      </CustomContainer>
    </>
  )
}
