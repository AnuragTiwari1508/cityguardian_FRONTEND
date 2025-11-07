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
    
    const complaint = await Complaint.findById(params.id);
    
    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    const userId = session.user.id;
    const hasLiked = complaint.likes.includes(userId);

    if (hasLiked) {
      // Unlike
      complaint.likes = complaint.likes.filter((id: any) => id.toString() !== userId);
    } else {
      // Like
      complaint.likes.push(userId);
    }

    await complaint.save();

    return NextResponse.json({ 
      likes: complaint.likes.length,
      hasLiked: !hasLiked 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}