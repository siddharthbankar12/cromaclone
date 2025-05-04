import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: { type: Number, default: 1 },
      },
    ],
    price: { type: Number },
  },
  { timestamps: true }
);

const Order = model("Orders", orderSchema);

export default Order;
