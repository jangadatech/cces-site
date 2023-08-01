import User from "@/models/User";
import connectMongoose from "@/config/mongoose";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  await connectMongoose();

  try {
    const { username, password } = await request.json();

    const user = await User.findOne({ username });
    
    if (!user) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
}