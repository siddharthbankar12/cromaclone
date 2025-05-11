import { Router } from "express";
import {
  allProducts0,
  discount0,
  deleteProduct0,
  updateProductQuantity0,
  usersManagement0,
  getAllOrders0,
} from "../controllers/admin.controllers.js";

const adminRouters = Router();

adminRouters.get("/all-products0", allProducts0);
adminRouters.get("/all-orders0", getAllOrders0);
adminRouters.post("/discount0", discount0);
adminRouters.delete("/delete-product0", deleteProduct0);
adminRouters.put("/update-product-quantity0", updateProductQuantity0);
adminRouters.post("/all-users0", usersManagement0);

export default adminRouters;
