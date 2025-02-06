import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'admin' ;
  phoneNumber: string;
  address?: string;
  adminAccessLevel?: number;
  image?: string;
  emailVerified?: boolean;
}

const userSchema = new Schema<User>(
  {
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },
    password: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'seller', 'admin'], required: true, default: 'buyer' },
    phoneNumber: { type: String },
    address: { type: String },
    adminAccessLevel: { type: Number, default: 1 },
    image: { type: String },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>('User', userSchema);
