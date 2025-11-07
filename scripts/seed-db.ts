import mongoose from 'mongoose';
import { exit } from 'process';

const MONGODB_URI = 'mongodb+srv://anshikakhushikansal122004_db_usre:ciSzK0z11uFKJWO1@cluster0.9fseuc0.mongodb.net/cityguardian?retryWrites=true&w=majority';

// Define schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: String,
  role: String,
  complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }]
});

const complaintSchema = new mongoose.Schema({
  type: String,
  title: String,
  description: String,
  location: {
    address: String,
    coordinates: {
      type: { type: String },
      coordinates: [Number]
    }
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: String,
  priority: String,
  contact: {
    mobile: String,
    email: String
  }
});

// Create models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Complaint.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const users = await User.create([
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
      }
    ]);
    console.log('Created users:', users);

    // Create test complaints
    const complaints = await Complaint.create([
      {
        type: 'pothole',
        title: 'Large pothole on Main Street',
        description: 'Dangerous pothole near intersection',
        location: {
          address: 'Main Street, Near 5th Avenue',
          coordinates: {
            type: 'Point',
            coordinates: [77.2090, 28.6139]
          }
        },
        author: users[0]._id,
        status: 'pending',
        priority: 'high',
        contact: {
          mobile: '9876543210',
          email: 'john@example.com'
        }
      },
      {
        type: 'waste',
        title: 'Garbage accumulation',
        description: 'Garbage pile in park',
        location: {
          address: 'Central Park',
          coordinates: {
            type: 'Point',
            coordinates: [77.2300, 28.6100]
          }
        },
        author: users[0]._id,
        status: 'in_progress',
        priority: 'medium',
        contact: {
          mobile: '9876543210',
          email: 'john@example.com'
        }
      }
    ]);
    console.log('Created complaints:', complaints);

    // Update user with complaints
    await User.findByIdAndUpdate(
      users[0]._id,
      { complaints: complaints.map(c => c._id) }
    );
    console.log('Updated user with complaints');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    exit();
  }
}

seed();