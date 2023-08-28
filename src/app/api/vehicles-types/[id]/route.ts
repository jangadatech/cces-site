import { NextResponse } from "next/server";
import connectMongoose from '@/config/mongoose';
import VehicleType from '@/models/VehicleType';


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectMongoose();
  const id = params.id;
  const vehicleType = await VehicleType.findById(id);

  if (!vehicleType) {
    let error_response = {
      status: "fail",
      message: "No Vehicle Type with the Provided ID Found",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.json(vehicleType);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
){
  await connectMongoose();
  try {
    const id = params.id;
    
    const data = await request.json();

    const vehicleTypeData = {
      name: data.name,
      seat: data.seat,
      updated_at: new Date().toISOString()
    };
  
    const vehicleType = await VehicleType.findByIdAndUpdate(id, vehicleTypeData, {
      new: true,
      runValidators: true
    });

    return NextResponse.json(vehicleType);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error updating Vehicle type' }, { status: 500 });
  }
}
