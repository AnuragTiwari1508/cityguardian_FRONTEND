import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Complaint from '@/models/Complaint';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const data = await req.json();
    
    const complaint = await Complaint.create({
      ...data,
      author: session.user.id
    });

    return NextResponse.json(complaint, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    
    let query = {};
    
    if (status) {
      query = { ...query, status };
    }
    
    if (type) {
      query = { ...query, type };
    }
    
    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
      .populate('author', 'name')
      .exec();

    return NextResponse.json(complaints);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}