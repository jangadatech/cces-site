import Vehicle from '@/app/models/Vehicle';
import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server'

export async function GET() {
  await connectMongoose();
  const vehicles = await Vehicle.find();
  return NextResponse.json(vehicles)
}

export async function POST(request: Request) {
  await connectMongoose();

  try {
    const { plate, active, prefix, vehicle_type_id } = await request.json();

    const vehicleData = {
      plate,
      active,
      prefix,
      vehicleType: vehicle_type_id
    };

    const vehicle = new Vehicle(vehicleData);
    const newVehicle = await vehicle.save();

    return NextResponse.json(newVehicle);
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}