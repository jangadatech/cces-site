import { connectToDatabase } from '@/config/mongo';
import { User } from '@/interfaces/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'
 
export async function GET() {
  
  const db = await connectToDatabase();
  const collection = db.collection('users');

  const users = await collection.find().toArray();

  return NextResponse.json({users})
}

export async function POST(request: Request) {
  const db = await connectToDatabase();
  const collection = db.collection('users');

  try {

    const { username, password, profile } = await request.json();
  
    const users = await collection.insertOne({
      username,
      password,
      profile,
      created_at: new Date()
    });
  
    return NextResponse.json({users})
  } catch (error) {
    
  }
}