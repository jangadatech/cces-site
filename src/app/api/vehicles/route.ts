import Vehicle from '@/models/Vehicle';
import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectMongoose();

  try {

      const vehicles = await Vehicle.aggregate(
        [
          {
            $lookup: 
            {
              from: "vehicletypes",
              localField: "vehicle_type_id",
              foreignField: "_id",
              as: "vehicle_type"
            }
          },
          {
              $unwind: "$vehicle_type"
          },
          {
            $addFields: {
              vehicle_type_name: "$vehicle_type.name"
            }
          }
        ]
      );
      return NextResponse.json(vehicles);
  } catch (error: any) {
      return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectMongoose();

  try {
    const { plate, active, prefix, vehicle_type_id } = await request.json();

    const vehicleData = {
      plate,
      active,
      prefix,
      vehicle_type_id
    };

    const vehicle = new Vehicle(vehicleData);
    const newVehicle = await vehicle.save();

    return NextResponse.json(newVehicle);
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}