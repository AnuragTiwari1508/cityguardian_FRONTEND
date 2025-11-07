import dotenv from 'dotenv';
import path from 'path';

// Load environment variables first
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('Loading env from:', envPath);
dotenv.config({ path: envPath });

console.log('MONGODB_URI loaded:', process.env.MONGODB_URI ? 'Yes' : 'No');

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...');
    
    // Dynamic imports to ensure env is loaded first
    const { default: dbConnect } = await import('@/lib/dbConnect');
    const { default: User } = await import('@/models/User');
    const { default: Complaint } = await import('@/models/Complaint');
    
    await dbConnect();
    console.log('✅ MongoDB connected successfully!');
    
    // Test User model
    const userCount = await User.countDocuments();
    console.log(`📊 Users in database: ${userCount}`);
    
    // Test Complaint model
    const complaintCount = await Complaint.countDocuments();
    console.log(`📊 Complaints in database: ${complaintCount}`);
    
    console.log('✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
}

testConnection();