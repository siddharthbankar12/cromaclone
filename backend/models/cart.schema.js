import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = model("Carts", cartSchema);

export default Cart;
