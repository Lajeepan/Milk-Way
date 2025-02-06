import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/utils/auth";

const rolePermissions: Record<string, string[]> = {
  user: ["user"],
  seller: ["user", "seller"],
  courier: ["user", "courier"],
  admin: ["user", "seller", "courier", "admin"],
};


export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = req.headers.get("authorization");

  if (!token) {
    return NextResponse.json({ message: "Token required" }, { status: 403 });
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  const { role } = user as { role: string };
  const allowedRoles = rolePermissions[role] || [];

  // Check if the user's role is allowed to access this endpoint
  if (!allowedRoles.includes(role)) {
    return NextResponse.json({ message: "Access denied" }, { status: 401 });
  }

  return NextResponse.json({ message: `Welcome ${role}` }, { status: 200 });
}
