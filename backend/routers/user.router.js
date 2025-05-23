import { Router } from "express";
import {
  AddToCart,
  DeleteCartProduct,
  GetCartProducts,
  UpdateCartProductQuantity,
  CheckOut,
  GetOrderHistory,
  BuyNow,
  updateWishList,
  getWishList,
  getSellerNotification,
} from "../controllers/user.controllers.js";

const UserRouters = Router();

UserRouters.post("/add-to-cart", AddToCart);
UserRouters.post("/get-cart-products", GetCartProducts);
UserRouters.post("/delete-cart-products", DeleteCartProduct);
UserRouters.post("/update-cart-product-quantity", UpdateCartProductQuantity);
UserRouters.post("/checkout", CheckOut);
UserRouters.post("/buy-now", BuyNow);
UserRouters.post("/get-order-history", GetOrderHistory);
UserRouters.post("/update-wishlist", updateWishList);
UserRouters.get("/get-wishlist/:userId", getWishList);
UserRouters.post("/notification", getSellerNotification);

export default UserRouters;
