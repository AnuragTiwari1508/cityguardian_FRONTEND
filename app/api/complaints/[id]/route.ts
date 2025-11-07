import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Complaint from '@/models/Complaint';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const complaint = await Complaint.findById(params.id)
      .populate('author', 'name email')
      .populate('comments.user', 'name')
      .exec();

    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    return NextResponse.json(complaint);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const data = await req.json();
    
    const complaint = await Complaint.findById(params.id);
    
    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    // Check if user is the author or has admin/employee role
    if (complaint.author.toString() !== session.user.id && 
        !['admin', 'employee'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).populate('author', 'name email');

    return NextResponse.json(updatedComplaint);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const complaint = await Complaint.findById(params.id);
    
    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    // Check if user is the author or has admin role
    if (complaint.author.toString() !== session.user.id && 
        session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await Complaint.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Complaint deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}