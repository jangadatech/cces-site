import Vehicle from '@/models/Vehicle';
import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server'
import IVehicle from '@/interfaces/IVehicle';

export async function GET(request: Request, { params }: { params: {id: string} }) {
    await connectMongoose();
  
    const { id } = params;
  
    try {
      const user = await Vehicle.findById(id);
  
      if (!user) {
        return NextResponse.json({error: 'vehicle not found' }, { status: 404 })
      }
  
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.json(error, { status: 500 })
    }
  }

export async function PUT(request: Request, { params }: { params: {id: string} }) {
  await connectMongoose();

  try {

    const { id } = params;
    const { plate, prefix, vehicle_type, active }: IVehicle = await request.json();
    
    const vehicleData : IVehicle = {
      plate,
      prefix,
      vehicle_type,
      active,
      updated_at: new Date().toISOString()
    };

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, vehicleData, {
      new: true,
      runValidators: true
    });

    if (!updatedVehicle ) {
      return NextResponse.json({error: 'vehicle not found' }, { status: 404 })
    }

    return NextResponse.json(updatedVehicle);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error update Vehicle' }, { status: 500 });
  }
}