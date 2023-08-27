import Driver from '@/models/Driver';
import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server'
import IDriver from '@/interfaces/IDriver';

export async function GET(request: Request, { params }: { params: {id: string} }) {
    await connectMongoose();
  
    const { id } = params;
  
    try {
      const driver = await Driver.findById(id);
  
      if (!driver) {
        return NextResponse.json({error: 'driver not found' }, { status: 404 })
      }
  
      return NextResponse.json(driver);
    } catch (error) {
      return NextResponse.json(error, { status: 500 })
    }
  }

export async function PUT(request: Request, { params }: { params: {id: string} }) {
  await connectMongoose();

  try {

    const { id } = params;
    const { name, full_name, enrollment } = await request.json();

    const driverData : IDriver = {
      name,
      full_name,
      enrollment,
      updated_at: new Date().toISOString()
    };

    const updatedDriver = await Driver.findByIdAndUpdate(id, driverData, {
      new: true,
      runValidators: true
    });

    if (!updatedDriver ) {
      return NextResponse.json({error: 'driver not found' }, { status: 404 })
    }

    return NextResponse.json(updatedDriver);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error update Driver' }, { status: 500 });
  }
}