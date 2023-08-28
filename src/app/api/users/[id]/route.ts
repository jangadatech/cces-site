import User from '@/models/User';
import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt';
import { IUser } from '@/interfaces/IUser';

export async function GET(request: Request, { params }: { params: {id: string} }) {
    await connectMongoose();
  
    const { id } = params;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return NextResponse.json({error: 'user not found' }, { status: 404 })
      }
  
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.json(error, { status: 500 })
    }
  }

export async function PUT(request: Request, { params }: { params: {id: string} }) {
  await connectMongoose();

  try {

    const { id } = params;
    const { username, full_name, profile, active, password }: IUser = await request.json();
    
    const saltRounds = 10;
    

    const driverData : IUser = {
      username,
      full_name,
      profile,
      active,
      updated_at: new Date().toISOString()
    };

    if(password){
      const hashedPassword = await bcrypt.hash(password!, saltRounds);
      driverData.password = hashedPassword
    }

    const updatedDriver = await User.findByIdAndUpdate(id, driverData, {
      new: true,
      runValidators: true
    });

    if (!updatedDriver ) {
      return NextResponse.json({error: 'user not found' }, { status: 404 })
    }

    return NextResponse.json(updatedDriver);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error update User' }, { status: 500 });
  }
}