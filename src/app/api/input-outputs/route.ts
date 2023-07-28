import InputOutput from '@/app/models/InputOutput';
import connectMongoose from '@/config/mongoose';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  await connectMongoose();

  try {
    const params = request.nextUrl.searchParams;
    const filterDate = params.get('date');

    let query = {};

    if (filterDate) {
      const dateFiltered = new Date(filterDate)
      const startOfDay = new Date(dateFiltered.getFullYear(), dateFiltered.getMonth(), dateFiltered.getDate());
      const endOfDay = new Date(dateFiltered.getFullYear(), dateFiltered.getMonth(), dateFiltered.getDate() + 2);
      
      query = {
        register_at: { $gte: startOfDay, $lt: endOfDay },
      };

    } else {
      const currentDate = new Date();
      const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

      query = {
        register_at: { $gte: startOfDay, $lt: endOfDay },
      };
    }

    const data = await InputOutput.find(query);

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
    return NextResponse.json({ error: 'Error saving InputOutput' }, { status: 500 });
  }
}
