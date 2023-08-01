import Driver from '@/models/Driver';
import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server'

export async function GET() {
  await connectMongoose();
  const drivers = await Driver.find();

  return NextResponse.json(drivers)
}

export async function POST(request: Request) {
  await connectMongoose();

  try {
    const { name, full_name, enrollment } = await request.json();

    const driverData = {
      name,
      full_name,
      enrollment,
    };

    const newDriver = await Driver.create(driverData);

    return NextResponse.json(newDriver);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error saving Driver' }, { status: 500 });
  }
}