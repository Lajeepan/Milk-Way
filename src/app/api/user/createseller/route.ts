import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../../lib/db";
import User from "../../../../../lib/models/User";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables.");

// Route for user registration
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, phoneNumber } = await req.json();

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await dbConnect();

    // Check if email or phone number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return NextResponse.json(
        { message: existingUser.email === email ? "Email already exists" : "Phone number already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role: "seller",
    });

    await newUser.save();
    
    // Ensure JWT_SECRET is not undefined
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined.");
      }
  

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });

    // Create response with cookie
    const response = NextResponse.json({ message: "User registered successfully", token }, { status: 201 });

    response.cookies.set("auth", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15552000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Something went wrong", error: errorMessage }, { status: 500 });
  }
}
