import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import DBconnect from '../../../../../lib/db';
import User from '../../../../../lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use a secure key from environment variables

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Basic validation
  if (!email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    await DBconnect(); // Connect to the database

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check if the password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the token and user details
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error during user login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
