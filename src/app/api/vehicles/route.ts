import Vehicle from '@/models/Vehicle';
import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server'
import VehicleType from '@/models/VehicleType';

export async function GET() {
  await connectMongoose();
  const vehicles = await Vehicle.find({}).populate("vehicleType");
  return NextResponse.json(vehicles)
}

export async function POST(request: Request) {
  await connectMongoose();

  try {
    const { plate, active, prefix, vehicleType } = await request.json();

    const vehicleData = {
      plate,
      active,
      prefix,
      vehicleType
    };

    const vehicle = new Vehicle(vehicleData);
    const newVehicle = await vehicle.save();

    return NextResponse.json(newVehicle);
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}