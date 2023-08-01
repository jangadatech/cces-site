import InputOutput from '@/app/models/InputOutput';
import connectMongoose from '@/config/mongoose';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  await connectMongoose();

  try {
    const data = await InputOutput.find().populate('driver').populate('vehicle').exec();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectMongoose();

  try {
    const { driver, vehicle, register_at, odometer, description, destiny, status } = await request.json();

    const inputOutputData = {
      driver,
      vehicle,
      register_at,
      odometer,
      description,
      destiny,
      status,
    };

    const newInputOutput = await InputOutput.create(inputOutputData);

    return NextResponse.json(newInputOutput);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'InputOutput with this driver and vehicle already exists' }, { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
