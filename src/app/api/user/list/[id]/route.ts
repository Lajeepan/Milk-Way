import { NextRequest, NextResponse } from "next/server";
import DBconnect from "../../../../../../lib/db";  // Make sure DB is set up properly
import UserSchema from "../../../../../../lib/models/User";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await DBconnect();

    const user = await UserSchema.findById(params.id); // Fetch user by ID

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
  }
};
