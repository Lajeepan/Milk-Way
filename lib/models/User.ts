import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'admin' | 'courier';
  phone?: string;
  address?: string;
  adminAccessLevel?: number;
  image?: string;
  emailVerified?: boolean;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },
    password: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'seller', 'admin', 'courier'], required: true, default: 'buyer' },
    phone: { type: String },
    address: { type: String },
    adminAccessLevel: { type: Number, default: 1 },
    image: { type: String },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>('User', userSchema);
