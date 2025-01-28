// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },  // Now required
  createdAt: { type: Date, required: true },     // Now required
  quantity: { type: Number, required: true },    // Now required
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
 