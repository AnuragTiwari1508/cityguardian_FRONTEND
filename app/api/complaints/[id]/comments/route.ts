import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Complaint from '@/models/Complaint';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const { text } = await req.json();
    
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
    }

    const complaint = await Complaint.findById(params.id);
    
    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    const newComment = {
      user: session.user.id,
      text: text.trim(),
      createdAt: new Date()
    };

    complaint.comments.push(newComment);
    await complaint.save();

    // Populate the new comment with user data
    await complaint.populate('comments.user', 'name');

    const addedComment = complaint.comments[complaint.comments.length - 1];

    return NextResponse.json(addedComment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const complaint = await Complaint.findById(params.id)
      .populate('comments.user', 'name')
      .select('comments')
      .exec();

    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    return NextResponse.json(complaint.comments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}