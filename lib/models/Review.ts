import mongoose, { Schema, Document } from 'mongoose';

interface Review extends Document {
  productId: mongoose.Schema.Types.ObjectId;  // Reference to the product being reviewed
  sellerId: mongoose.Schema.Types.ObjectId;   // Reference to the seller offering the product
  customerId: mongoose.Schema.Types.ObjectId; // Reference to the customer who left the review
  rating: number;  // Rating given by the customer (1 to 5)
  comment: string;  // Text review/comment from the customer
  createdAt: Date;  // Date the review was submitted
}

const reviewSchema = new Schema<Review>(
  {
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
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Link to the User schema (customer)
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be greater than 5']
    },
    comment: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }  // Automatically add updatedAt along with createdAt
);

export default mongoose.models.Review || mongoose.model<Review>('Review', reviewSchema);
