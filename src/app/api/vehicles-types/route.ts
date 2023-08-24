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

    const vehicleTypeData = new VehicleType ({
      name,
      seat
    });

    const newVehicleType = await vehicleTypeData.save();

    return NextResponse.json(newVehicleType);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error saving Vehicle type' }, { status: 500 });
  }
}

// export async function PUT(request: Request) {
//   await connectMongoose();

//   try {
//     const { id, name, seat } = await request.json();

//     const vehicleType = await VehicleType.findByIdAndUpdate(id, {
//       name,
//       seat
//     });

//     return NextResponse.json(vehicleType);
//   } catch (error: any) {
//     return NextResponse.json({ error: 'Error updating Vehicle type' }, { status: 500 });
//   }
// }