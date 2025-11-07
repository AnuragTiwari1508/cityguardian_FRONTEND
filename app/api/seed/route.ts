import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
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
    await dbConnect();
    console.log('✅ Database connected for data retrieval');

    // Get all data from database
    const users = await User.find({}).select('-password');
    const complaints = await Complaint.find({}).populate('author', 'name email role');
    
    console.log(`📊 Found ${users.length} users and ${complaints.length} complaints`);
    
    return NextResponse.json({
      success: true,
      message: 'Data retrieved successfully from MongoDB Atlas',
      timestamp: new Date().toISOString(),
      data: {
        totalUsers: users.length,
        totalComplaints: complaints.length,
        users: users.map(u => ({
          id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          mobile: u.mobile,
          createdAt: u.createdAt
        })),
        complaints: complaints.map(c => ({
          id: c._id,
          title: c.title,
          type: c.type,
          description: c.description,
          status: c.status,
          priority: c.priority,
          location: c.location,
          contact: c.contact,
          author: c.author,
          likes: c.likes?.length || 0,
          comments: c.comments?.length || 0,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt
        }))
      }
    });

  } catch (error: any) {
    console.error('❌ Data retrieval failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      details: 'Failed to retrieve data from MongoDB Atlas'
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    console.log('🔄 Starting data seeding to MongoDB Atlas...');
    await dbConnect();
    console.log('✅ Database connected successfully');

    // Enhanced sample users
    const sampleUsers = [
      {
        name: 'Anshika Agrawal',
        email: 'anshika@cityguardian.com',
        password: 'password123',
        mobile: '9876543210',
        role: 'citizen'
      },
      {
        name: 'City Employee Delhi',
        email: 'employee.delhi@cityguardian.com', 
        password: 'password123',
        mobile: '9876543211',
        role: 'employee'
      },
      {
        name: 'System Admin',
        email: 'admin@cityguardian.com',
        password: 'admin123',
        mobile: '9876543212',
        role: 'admin'
      }
    ];

    let createdUsers = [];
    for (const userData of sampleUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        createdUsers.push(user);
        console.log(`👤 Created user: ${user.name} (${user.email})`);
      } else {
        createdUsers.push(existingUser);
        console.log(`👤 User exists: ${existingUser.name} (${existingUser.email})`);
      }
    }

    // Enhanced sample complaints
    const sampleComplaints = [
      {
        type: 'pothole',
        title: 'Dangerous pothole on Delhi Main Road',
        description: 'Large pothole causing accidents near the main market area in Delhi. Water logging during rains. Immediate attention required.',
        location: {
          address: 'Main Road, Near Connaught Place, Delhi',
          coordinates: [77.2090, 28.6139]
        },
        priority: 'high',
        contact: {
          mobile: '9876543210',
          email: 'anshika@cityguardian.com'
        },
        author: createdUsers[0]._id,
        status: 'pending'
      },
      {
        type: 'waste',
        title: 'Garbage overflow in Noida residential area',
        description: 'Garbage bins are overflowing for the past week causing bad smell and health issues. Stray animals creating mess.',
        location: {
          address: 'Sector 15, Block A, Noida, UP',
          coordinates: [77.3910, 28.5355]
        },
        priority: 'medium',
        contact: {
          mobile: '9876543210',
          email: 'anshika@cityguardian.com'
        },
        author: createdUsers[0]._id,
        status: 'in_progress'
      },
      {
        type: 'streetlight',
        title: 'Multiple broken street lights in Gurgaon park',
        description: 'Several street lights are not working making the Central Park unsafe during evening hours. Security concern for joggers.',
        location: {
          address: 'Central Park, Sector 29, Gurgaon, Haryana',
          coordinates: [77.0266, 28.4595]
        },
        priority: 'critical',
        contact: {
          mobile: '9876543211',
          email: 'employee.delhi@cityguardian.com'
        },
        author: createdUsers[1]._id,
        status: 'resolved'
      },
      {
        type: 'air_pollution',
        title: 'Industrial pollution from textile factory',
        description: 'Factory releasing harmful gases and smoke without proper treatment affecting air quality in entire neighborhood.',
        location: {
          address: 'Industrial Area Phase 2, Gurgaon, Haryana',
          coordinates: [77.0688, 28.4601]
        },
        priority: 'critical',
        contact: {
          mobile: '9876543212',
          email: 'admin@cityguardian.com'
        },
        author: createdUsers[2]._id,
        status: 'pending'
      },
      {
        type: 'water',
        title: 'Water supply contamination in South Delhi',
        description: 'Water coming from taps is brownish and has bad smell. Possible sewage contamination. Multiple families affected.',
        location: {
          address: 'Vasant Kunj, New Delhi',
          coordinates: [77.1599, 28.5244]
        },
        priority: 'critical',
        contact: {
          mobile: '9876543210',
          email: 'anshika@cityguardian.com'
        },
        author: createdUsers[0]._id,
        status: 'pending'
      }
    ];

    let createdComplaints = [];
    for (const complaintData of sampleComplaints) {
      const existingComplaint = await Complaint.findOne({ title: complaintData.title });
      if (!existingComplaint) {
        const complaint = new Complaint(complaintData);
        await complaint.save();
        createdComplaints.push(complaint);
        console.log(`📝 Created complaint: ${complaint.title}`);
      } else {
        createdComplaints.push(existingComplaint);
        console.log(`📝 Complaint exists: ${existingComplaint.title}`);
      }
    }

    // Get final counts
    const userCount = await User.countDocuments();
    const complaintCount = await Complaint.countDocuments();

    console.log(`🎉 Seeding completed! ${userCount} users, ${complaintCount} complaints`);

    return NextResponse.json({
      success: true,
      message: 'Sample data seeded successfully to MongoDB Atlas',
      timestamp: new Date().toISOString(),
      data: {
        usersCreated: createdUsers.filter(u => u.isNew !== false).length,
        complaintsCreated: createdComplaints.filter(c => c.isNew !== false).length,
        totalUsers: userCount,
        totalComplaints: complaintCount,
        users: createdUsers.map(u => ({ 
          id: u._id, 
          name: u.name, 
          email: u.email, 
          role: u.role,
          mobile: u.mobile 
        })),
        complaints: createdComplaints.map(c => ({ 
          id: c._id, 
          title: c.title, 
          type: c.type, 
          status: c.status,
          priority: c.priority,
          location: c.location.address,
          author: c.author
        }))
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('❌ Seeding failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      details: 'Failed to seed sample data to MongoDB Atlas',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
