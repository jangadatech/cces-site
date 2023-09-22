import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server'
import IVehicle from '@/interfaces/IVehicle';
import InputOutput from '@/models/InputOutput';
import IInputOutput from '@/interfaces/IInputOutput';

export async function GET(request: Request, { params }: { params: {id: string} }) {
    await connectMongoose();
  
    const { id } = params;
  
    try {
      const inputOutput = await InputOutput.findById(id).populate('driver').populate('vehicle').exec();
  
      if (!inputOutput) {
        return NextResponse.json({error: 'inputOutput not found' }, { status: 404 })
      }
  
      return NextResponse.json(inputOutput);
    } catch (error) {
      return NextResponse.json(error, { status: 500 })
    }
  }

export async function PUT(request: Request, { params }: { params: {id: string} }) {
  await connectMongoose();

  try {

    const { id } = params;
    const { status, description, destination, driver, odometer, vehicle}: IInputOutput = await request.json();
    
    const inputOutputData : IInputOutput = {
      status, 
      description, 
      destination, 
      driver, 
      odometer, 
      vehicle,
      updated_at: new Date().toISOString()
    };

    const updatedVehicle = await InputOutput.findByIdAndUpdate(id, inputOutputData, {
      new: true,
      runValidators: true
    });

    if (!updatedVehicle ) {
      return NextResponse.json({error: 'InputOutput not found' }, { status: 404 })
    }

    return NextResponse.json(updatedVehicle);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error update InputOutput' }, { status: 500 });
  }
}