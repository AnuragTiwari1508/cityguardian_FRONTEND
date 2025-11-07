import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const data = await req.json();
    
    const existingUser = await User.findOne({ email: data.email });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    const user = await User.create(data);
    
    const { password, ...userWithoutPassword } = user.toObject();
    
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}