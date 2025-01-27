import { NextApiRequest } from 'next';
import DBconnect from '../../../../lib/db'; // Adjust based on your actual directory structure
import Product from '../../../../lib/models/Product'; // Adjust based on your actual directory structure
import cloudinary from '../../../../lib/utils/cloudinary'; // Adjust based on your actual directory structure

interface ProductData {
  name: string;
  price: number;
  image: string;
  description?: string;
  createdAt?: Date;
  quantity?: number;
}

// Named POST export for the App Directory structure
export async function POST(req: NextApiRequest) {
  try {
    // Get the JSON body data from the request
    const body = await req.json();
    const { name, price, image, description, createdAt, quantity }: ProductData = body.data;

    if (!name || !price || !image || !description || !createdAt || !quantity) {
      return new Response(
        JSON.stringify({ error: 'Missing product details: name, price, image, description, createdAt, quantity' }),
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await DBconnect();

    // Get the base64 image string from the request body
    const fileStr: string = image; // Base64 image string
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'ecommerce_products', // Cloudinary folder to upload the image
    });

    // Save product details to MongoDB
    const newProduct = await Product.create({
      name,
      price,
      image: uploadResponse.secure_url, // URL of the uploaded image
      description,
      createdAt,
      quantity,
    });

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Product added successfully', product: newProduct }),
      { status: 200 }
      
    );
  } catch (error) {
    console.error('Error uploading product:', error);

    // Return error response
    return new Response(
      JSON.stringify({ error: 'Failed to upload product' }),
      { status: 500 }
    );
  }
}
