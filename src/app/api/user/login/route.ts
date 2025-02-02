import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import DBconnect from "../../../../../lib/db";
import UserSchema from "../../../../../lib/models/User";
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (req: NextRequest) => {
  try {
    await DBconnect();
    const { email, password } = await req.json();

    // Find the user by email
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User found:", user);

    // Log password for debugging (don't do this in production)
    console.log("Password being checked:", password);
    console.log("Hashed Password from DB:", user.password);

    // Compare password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT token without including password
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Prepare response and set token in cookie
    const response = NextResponse.json(
      { message: "Login successful", token, userType: user.role },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15552000, // Adjust token expiration if needed
      path: "/"
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
