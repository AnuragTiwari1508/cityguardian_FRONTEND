import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/models/User';
import Complaint from '@/models/Complaint';

const sampleUsers = [
  {
    name: 'John Citizen',
    email: 'john@example.com',
    password: 'password123',
    mobile: '9876543210',
    role: 'citizen'
  },
  {
    name: 'Emma Employee',
    email: 'emma@cityguardian.com',
    password: 'password123',
    mobile: '9876543211',
    role: 'employee'
  },
  {
    name: 'Admin User',
    email: 'admin@cityguardian.com',
    password: 'admin123',
    mobile: '9876543212',
    role: 'admin'
  }
];

const sampleComplaints = [
  {
    type: 'pothole',
    title: 'Large pothole on Main Street',
    description: 'There is a dangerous pothole near the intersection of Main Street and 5th Avenue.',
    location: {
      address: 'Main Street, Near 5th Avenue',
      coordinates: {
        type: 'Point',
        coordinates: [77.2090, 28.6139] // Delhi coordinates
      }
    },
    priority: 'high',
    contact: {
      mobile: '9876543210',
      email: 'john@example.com'
    },
    status: 'pending'
  },
  {
    type: 'waste',
    title: 'Garbage accumulation in park',
    description: 'Large amount of garbage accumulated in Central Park near the playground area.',
    location: {
      address: 'Central Park, East Entrance',
      coordinates: {
        type: 'Point',
        coordinates: [77.2300, 28.6100]
      }
    },
    priority: 'medium',
    contact: {
      mobile: '9876543210',
      email: 'john@example.com'
    },
    status: 'in_progress'
  },
  {
    type: 'streetlight',
    title: 'Street light not working',
    description: 'Street light has been out for 3 days near residential area.',
    location: {
      address: 'Park Street, Block B',
      coordinates: {
        type: 'Point',
        coordinates: [77.2200, 28.6150]
      }
    },
    priority: 'low',
    contact: {
      mobile: '9876543210',
      email: 'john@example.com'
    },
    status: 'pending'
  }
];

export async function GET() {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Complaint.deleteMany({});

    // Create users
    const createdUsers = await User.create(sampleUsers);

    // Add user references to complaints
    const complaintsWithUsers = sampleComplaints.map(complaint => ({
      ...complaint,
      author: createdUsers[0]._id // Assign all complaints to the citizen user
    }));

    // Create complaints
    const createdComplaints = await Complaint.create(complaintsWithUsers);

    // Update user with their complaints
    await User.findByIdAndUpdate(
      createdUsers[0]._id,
      { $push: { complaints: { $each: createdComplaints.map(c => c._id) } } }
    );

    return NextResponse.json({
      message: 'Database seeded successfully',
      users: createdUsers,
      complaints: createdComplaints
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
