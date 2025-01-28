// src/app/api/product/[id]/route.ts
import DBconnect from '../../../../../lib/db'; // Adjust based on your directory structure
import Product from '../../../../../lib/models/Product'; // Adjust based on your directory structure
import { NextResponse } from 'next/server';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  createdAt?: Date;
  quantity?: number;
}

// Named GET export for the App Directory structure
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    console.log('Connecting to the database...');
    await DBconnect(); // Connect to the database
    console.log('Database connected successfully!');

    // Await params before accessing the id
    const { id } = await params;  // Await params here

    // Fetch the product by ID from MongoDB
    const product: Product | null = await Product.findById(id);

    if (!product) {
      console.log(`Product with ID ${id} not found.`);
      return NextResponse.json({ error: `Product with ID ${id} not found` }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 }); // Return the fetched product
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
