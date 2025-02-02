import jwt from 'jsonwebtoken';

// JWT Secret (Make sure it's stored in environment variables securely)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Function to verify JWT token
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
