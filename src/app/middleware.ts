import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export function middleware(req: NextRequest) {
  // Extract token from the Authorization header
  const token = req.headers.get("Authorization")?.split(" ")[1];

  // Check if token is missing
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if token is missing
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };

    // Destructure the role from the decoded token
    const { role } = decoded;

    // Get the current URL to check the requested path
    const url = req.nextUrl.clone();

    // Role-based redirection logic
    if (url.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/error", req.url)); // Redirect to error page if not admin
    }
    if (url.pathname.startsWith("/home") && role !== "buyer") {
      return NextResponse.redirect(new URL("/error", req.url)); // Redirect to error page if not buyer
    }
    if (url.pathname.startsWith("/seller") && role !== "seller") {
      return NextResponse.redirect(new URL("/error", req.url)); // Redirect to error page if not seller
    }
    if (url.pathname.startsWith("/courier") && role !== "courier") {
      return NextResponse.redirect(new URL("/error", req.url)); // Redirect to error page if not courier
    }

    // If the user is authorized, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Redirect to login page if token verification fails
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
