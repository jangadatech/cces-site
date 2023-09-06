import InputOutput from '@/models/InputOutput';
import connectMongoose from '@/config/mongoose';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: {vehicle_id: string} }) {
  await connectMongoose();

  const { vehicle_id } = params;

  try {
    const inputOutput = await InputOutput
    .findOne({vehicle: vehicle_id, status: "input"})
    .sort({ register_at: -1 })
    .exec();


    if (!inputOutput) {
      return NextResponse.json({error: 'inputOutput not found' }, { status: 404 })
    }

    return NextResponse.json(inputOutput);
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}