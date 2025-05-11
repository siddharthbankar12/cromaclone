import mongoose, { model, Schema } from "mongoose";

const wishListSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
});

const WishList = model("WishLists", wishListSchema);

export default WishList;
