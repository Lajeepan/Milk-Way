import mongoose, { Schema, Document } from 'mongoose';

interface Order extends Document {
  customerId: mongoose.Schema.Types.ObjectId;  // Reference to the customer placing the order
  productId: mongoose.Schema.Types.ObjectId;   // Reference to the product ordered
  sellerId: mongoose.Schema.Types.ObjectId;    // Reference to the seller fulfilling the order
  quantity: number;  // Quantity of the product ordered
  totalPrice: number; // Total price for the order (product price * quantity)
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';  // Current status of the order
  createdAt: Date;  // Date the order was placed
}

const orderSchema = new Schema<Order>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Link to the User schema (customer)
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  // Link to the Product schema
      required: true
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Link to the User schema (seller)
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price must be a positive number']
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }  // Automatically add updatedAt along with createdAt
);

export default mongoose.models.Order || mongoose.model<Order>('Order', orderSchema);
