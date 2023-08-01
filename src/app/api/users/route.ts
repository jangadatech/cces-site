import User from '@/models/User';
import connectMongoose from '@/config/mongoose';
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
 
export async function GET() {
  await connectMongoose();
  const users = await User.find();

  return NextResponse.json(users)
}

export async function POST(request: Request) {
  await connectMongoose();

  try {
    const { full_name, username, password, profile } = await request.json();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      full_name,
      username,
      password: hashedPassword,
      profile,
    });

    const newUser = await user.save();

    return NextResponse.json(newUser);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}