// Backend - API route for verifying the token
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export default async function verify(req, res) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
      
      if (!token) {
        return res.status(403).json({ message: 'Token is required' });
      }

      // Verify the token
      const decoded = jwt.verify(token, SECRET_KEY);

      // If the token is valid, return user data (e.g., id, role)
      return res.status(200).json({ id: decoded.id, email: decoded.email, role: decoded.role });

    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
