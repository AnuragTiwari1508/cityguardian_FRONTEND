import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a strong secret in production

export const authenticate = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user; // Attach user info to request
    next();
  });
};