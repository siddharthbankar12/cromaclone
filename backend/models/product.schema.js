import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discountPercentage: { type: Number, default: 0 },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

const Product = model("Products", productSchema);

export default Product;
