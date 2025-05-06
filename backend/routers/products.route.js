import { Router } from "express";
import {
  AddProduct,
  AddedProducts,
  getAllProducts,
  SingleProductData,
} from "../controllers/products.controllers.js";
import { cookieToken } from "../services/token.service.js";

const productsRouters = Router();

productsRouters.post("/add-product", cookieToken, AddProduct); // seller
productsRouters.post("/added-products", cookieToken, AddedProducts); // seller
productsRouters.get("/all-products", getAllProducts); // user
productsRouters.post("/single-product-data", SingleProductData); // user

export default productsRouters;
