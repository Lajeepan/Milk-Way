// /middleware/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';  // Ensure this import is correct
import jwt from 'jsonwebtoken';

export const withAuth = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];  // Ensure headers are recognized
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server error, JWT secret missing' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
      req.user = decoded;  // TypeScript should now recognize req.user if next.d.ts is properly extended
      return handler(req, res);
    } catch (error) {
      console.error(error);  // Optional: log the error for debugging
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};
