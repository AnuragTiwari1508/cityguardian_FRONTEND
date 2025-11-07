import dotenv from 'dotenv';
import path from 'path';

// Load environment variables first
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('🔧 Loading environment from:', envPath);
dotenv.config({ path: envPath });

async function fullDatabaseTest() {
  try {
    console.log('');
    console.log('🚀 CITYGUARDIAN DATABASE COMPLETE TEST');
    console.log('=====================================');
    console.log('');

    // Dynamic imports to ensure env is loaded first
    const { default: dbConnect } = await import('@/lib/dbConnect');
    const { default: User } = await import('@/models/User');
    const { default: Complaint } = await import('@/models/Complaint');
    
    console.log('🔄 Step 1: Testing MongoDB Atlas connection...');
    const startTime = Date.now();
    await dbConnect();
    const connectionTime = Date.now() - startTime;
    console.log(`✅ MongoDB Atlas connected successfully in ${connectionTime}ms`);
    
    // Get connection details
    const mongoose = await import('mongoose');
    const connection = mongoose.default.connection;
    
    console.log('');
    console.log('🔗 Connection Details:');
    console.log(`   Database: ${connection.name}`);
    console.log(`   Host: ${connection.host}`);
    console.log(`   Ready State: ${connection.readyState === 1 ? 'Connected ✅' : 'Not Connected ❌'}`);
    console.log('');

    // Step 2: Check existing data
    console.log('📊 Step 2: Checking existing data...');
    const userCount = await User.countDocuments();
    const complaintCount = await Complaint.countDocuments();
    
    console.log(`👥 Users in database: ${userCount}`);
    console.log(`📝 Complaints in database: ${complaintCount}`);
    console.log('');

    // Step 3: Create sample data if none exists
    console.log('🏗️  Step 3: Creating sample data...');
    
    // Create sample users
    const sampleUsers = [
      {
        name: 'Test Citizen 1',
        email: 'citizen1@cityguardian.com',
        password: 'password123',
        mobile: '9876543210',
        role: 'citizen'
      },
      {
        name: 'Test Employee',
        email: 'employee@cityguardian.com', 
        password: 'password123',
        mobile: '9876543211',
        role: 'employee'
      },
      {
        name: 'Admin User',
        email: 'admin@cityguardian.com',
        password: 'password123',
        mobile: '9876543212',
        role: 'admin'
      }
    ];

    let createdUsers = [];
    for (const userData of sampleUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        createdUsers.push(user);
        console.log(`👤 Created user: ${user.name} (${user.email})`);
      } else {
        createdUsers.push(existingUser);
        console.log(`👤 User already exists: ${existingUser.name} (${existingUser.email})`);
      }
    }

    // Create sample complaints
    const sampleComplaints = [
      {
        type: 'pothole',
        title: 'Large pothole on Main Street',
        description: 'There is a dangerous pothole near the traffic signal that needs immediate attention.',
        location: {
          address: 'Main Street, Near Traffic Signal, Delhi',
          coordinates: [77.2090, 28.6139]
        },
        priority: 'high',
        contact: {
          mobile: '9876543210',
          email: 'citizen1@cityguardian.com'
        },
        author: createdUsers[0]._id,
        status: 'pending'
      },
      {
        type: 'waste',
        title: 'Garbage not collected for 3 days',
        description: 'The garbage in our locality has not been collected for the past 3 days causing health issues.',
        location: {
          address: 'Sector 15, Noida, UP',
          coordinates: [77.3910, 28.5355]
        },
        priority: 'medium',
        contact: {
          mobile: '9876543210',
          email: 'citizen1@cityguardian.com'
        },
        author: createdUsers[0]._id,
        status: 'in_progress'
      },
      {
        type: 'streetlight',
        title: 'Broken street light causing safety issues',
        description: 'The street light has been broken for a week making the area unsafe at night.',
        location: {
          address: 'Park Street, Gurgaon, Haryana',
          coordinates: [77.0266, 28.4595]
        },
        priority: 'critical',
        contact: {
          mobile: '9876543211',
          email: 'employee@cityguardian.com'
        },
        author: createdUsers[1]._id,
        status: 'resolved'
      },
      {
        type: 'air_pollution',
        title: 'Industrial smoke causing air pollution',
        description: 'Factory is releasing thick smoke without proper filtration causing air quality issues.',
        location: {
          address: 'Industrial Area, Phase 1, Gurgaon',
          coordinates: [77.0688, 28.4601]
        },
        priority: 'critical',
        contact: {
          mobile: '9876543212',
          email: 'admin@cityguardian.com'
        },
        author: createdUsers[2]._id,
        status: 'pending'
      }
    ];

    let createdComplaints = [];
    for (const complaintData of sampleComplaints) {
      // Check if complaint with same title already exists
      const existingComplaint = await Complaint.findOne({ title: complaintData.title });
      if (!existingComplaint) {
        const complaint = new Complaint(complaintData);
        await complaint.save();
        createdComplaints.push(complaint);
        console.log(`📝 Created complaint: ${complaint.title} (${complaint.type})`);
      } else {
        createdComplaints.push(existingComplaint);
        console.log(`📝 Complaint already exists: ${existingComplaint.title}`);
      }
    }

    console.log('');
    console.log('🎯 Step 4: Verifying data in database...');
    
    // Get updated counts
    const finalUserCount = await User.countDocuments();
    const finalComplaintCount = await Complaint.countDocuments();
    
    console.log(`👥 Total users now: ${finalUserCount}`);
    console.log(`📝 Total complaints now: ${finalComplaintCount}`);
    console.log('');

    // Step 5: Display all data
    console.log('📋 Step 5: Displaying all data from database...');
    console.log('');
    
    console.log('👥 ALL USERS:');
    console.log('=============');
    const allUsers = await User.find({}).select('-password');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Mobile: ${user.mobile}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log('   ---');
    });
    
    console.log('');
    console.log('📝 ALL COMPLAINTS:');
    console.log('==================');
    const allComplaints = await Complaint.find({}).populate('author', 'name email');
    allComplaints.forEach((complaint, index) => {
      console.log(`${index + 1}. Title: ${complaint.title}`);
      console.log(`   Type: ${complaint.type}`);
      console.log(`   Priority: ${complaint.priority}`);
      console.log(`   Status: ${complaint.status}`);
      console.log(`   Location: ${complaint.location.address}`);
      console.log(`   Author: ${complaint.author?.name} (${complaint.author?.email})`);
      console.log(`   Contact: ${complaint.contact.mobile}`);
      console.log(`   Created: ${complaint.createdAt}`);
      console.log('   ---');
    });

    console.log('');
    console.log('🔍 Step 6: Testing API endpoints...');
    
    // Test health endpoint
    try {
      const response = await fetch('http://localhost:3000/api/health');
      const healthData = await response.json();
      console.log('✅ Health endpoint working:', healthData.status);
    } catch (error) {
      console.log('❌ Health endpoint test failed:', error.message);
    }

    console.log('');
    console.log('🎉 DATABASE TEST COMPLETED SUCCESSFULLY!');
    console.log('========================================');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   ✅ Database connected successfully`);
    console.log(`   ✅ ${finalUserCount} users in database`);
    console.log(`   ✅ ${finalComplaintCount} complaints in database`);
    console.log(`   ✅ Sample data created and verified`);
    console.log(`   ✅ All data displayed successfully`);
    console.log('');
    console.log('🚀 Your database is ready for the application!');
    console.log('💡 You can now test the complaint system at: http://localhost:3000/citizen/reports');
    
    process.exit(0);
  } catch (error: any) {
    console.error('');
    console.error('❌ DATABASE TEST FAILED:');
    console.error('========================');
    console.error(error.message);
    console.error('');
    
    if (error.message?.includes('serverSelection')) {
      console.error('🚫 Connection Error: Could not connect to MongoDB Atlas');
      console.error('💡 Solutions:');
      console.error('   1. Check MongoDB Atlas IP whitelist');
      console.error('   2. Verify your internet connection');
      console.error('   3. Check MongoDB Atlas cluster status');
      console.error('   4. Verify connection string in .env.local');
    }
    
    process.exit(1);
  }
}

fullDatabaseTest();