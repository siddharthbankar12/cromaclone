import { Router } from "express";
import {
  AddToCart,
  DeleteCartProduct,
  GetCartProducts,
  UpdateCartProductQuantity,
  CheckOut,
  GetOrderHistory,
  BuyNow,
} from "../controllers/user.controllers.js";

const UserRouters = Router();

UserRouters.post("/add-to-cart", AddToCart);
UserRouters.post("/get-cart-products", GetCartProducts);
UserRouters.post("/delete-cart-products", DeleteCartProduct);
UserRouters.post("/update-cart-product-quantity", UpdateCartProductQuantity);
UserRouters.post("/checkout", CheckOut);
UserRouters.post("/buy-now", BuyNow);
UserRouters.post("/get-order-history", GetOrderHistory);

export default UserRouters;
