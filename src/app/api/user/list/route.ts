import {  NextResponse } from "next/server";
import DBconnect from "../../../../../lib/db";
import UserSchema from "../../../../../lib/models/User";

export const GET = async () => {
  try {
    await DBconnect();

    const users = await UserSchema.find({}, "-password"); // Exclude passwords

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
};
