import mongoose, { Schema, Document } from 'mongoose';

interface Product extends Document {
  name: string;
  price: number;
  image: string;
  description: string;
  createdAt: Date;
  quantity: number;
}

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    price: { 
      type: Number, 
      required: true, 
      min: [0, 'Price must be a positive number'] 
    },
    image: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },  // Automatically sets to current date
    quantity: { 
      type: Number, 
      required: true, 
      min: [0, 'Quantity cannot be negative'] 
    },
  }
);

export default mongoose.models.Product || mongoose.model<Product>('Product', productSchema);
