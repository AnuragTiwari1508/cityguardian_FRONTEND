import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/user'; // Assuming you have a User model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secure secret

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password, action } = req.body;

    if (action === 'register') {
      // User registration
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      return res.status(201).json({ message: 'User registered successfully' });
    }

    if (action === 'login') {
      // User login
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    }

    return res.status(400).json({ message: 'Invalid action' });
  }

  return res.status(405).end(); // Method Not Allowed
}