import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "../../../../../lib/utils/products";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params; // Await params before accessing

  try {
    const product = await getProductById(id); // Fetch the product by ID

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error); // Log any errors for debugging
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
