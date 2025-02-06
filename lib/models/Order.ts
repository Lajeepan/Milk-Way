import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  firstName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  phoneNumber: string;
  email: string;
}

const OrderSchema = new Schema<IOrder>(
  {
    Name: { type: String, required: true },
    streetAddress: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
