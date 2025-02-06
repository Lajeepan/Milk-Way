import { NextResponse } from "next/server";
import  DBconnect  from "@/lib/db";
import Order from "@/lib/models/Order";

export async function POST(req: Request) {
  await DBconnect();
  try {
    const body = await req.json();
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

export async function GET() {
  await DBconnect();
  try {
    const orders = await Order.find();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
