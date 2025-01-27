import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'admin' | 'delivery';
  phone?: string;
  address?: string;
  products?: mongoose.Schema.Types.ObjectId[];
  storeName?: string;
  vehicleNumber?: string;
  deliveryHistory?: {
    orderId: mongoose.Schema.Types.ObjectId;
    deliveredAt: Date;
  }[];
  adminAccessLevel?: number;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin', 'delivery'],
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
   // Fields specific to sellers
   products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  storeName: {
    type: String,
  },
  // Fields specific to delivery persons
  vehicleNumber: {
    type: String,
  },
  deliveryHistory: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
      deliveredAt: {
        type: Date,
      },
    },
  ],
  // Fields specific to admin
  adminAccessLevel: {
    type: Number,
    default: 1, // 1: Basic admin, 2: Super admin
  },
},
{
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model<User>('User', userSchema);

export default User;
