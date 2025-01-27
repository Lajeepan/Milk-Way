// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import DBconnect from '../../../../../lib/db';  // Your DB connection utility
import User from '../../../../../lib/models/User';  // MongoDB User model (to be created)

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Basic validation
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    await DBconnect();  // Connect to the database

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email is already registered' }, { status: 409 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();  // Save the user in the database

    return NextResponse.json({ message: 'Account created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
