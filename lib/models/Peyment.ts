import mongoose, { Schema, Document } from 'mongoose';

interface Payment extends Document {
  orderId: mongoose.Schema.Types.ObjectId;   // Reference to the Order schema
  customerId: mongoose.Schema.Types.ObjectId; // Reference to the customer who made the payment
  amount: number;  // Total amount paid
  paymentMethod: 'credit_card' | 'cash_on_delivery'; // Payment method used
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'; // Payment status
  transactionId: string;  // Transaction ID from the payment gateway (if applicable)
  paymentDate: Date;  // Date when the payment was made
}

const paymentSchema = new Schema<Payment>(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',  // Link to the Order schema
      required: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Link to the User schema (customer)
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount must be a positive number']
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
      required: true
    },
    transactionId: {
      type: String,
      required: false  // Transaction ID may not be applicable for some methods like COD
    },
    paymentDate: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  { timestamps: true }  // Automatically add updatedAt along with createdAt
);

export default mongoose.models.Payment || mongoose.model<Payment>('Payment', paymentSchema);
