import VehicleType from '@/models/VehicleType';
import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server'

export async function GET() {
  await connectMongoose();
  const vehicleTypes = await VehicleType.find();

  return NextResponse.json(vehicleTypes)
}

export async function POST(request: Request) {
  await connectMongoose();

  try {
    const { name, seat } = await request.json();

    const vehicleTypeData = {
      name,
      seat
    };

    const newVehicleType = await VehicleType.create(vehicleTypeData);

    return NextResponse.json(newVehicleType);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error saving Vehicle type' }, { status: 500 });
  }
}