import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../../lib/db";
import UserSchema from "../../../../../lib/models/User";
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  try {
    await DBconnect();

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Name, Email, and Password are required" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserSchema({
      name,
      email,
      password: hashedPassword,  // Save the hashed password
      role,
    });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
};
