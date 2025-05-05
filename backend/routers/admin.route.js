import { Router } from "express";
import {
  allProducts0,
  Discount0,
  deleteProduct0,
  updateProductQuantity0,
} from "../controllers/admin.controllers.js";

const adminRouters = Router();

adminRouters.get("/all-products0", allProducts0);
adminRouters.post("/discount0", Discount0);
adminRouters.delete("/delete-product0", deleteProduct0);
adminRouters.put("/update-product-quantity0", updateProductQuantity0);

export default adminRouters;
