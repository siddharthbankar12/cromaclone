import { Router } from "express";
import {
  AddProduct,
  AddedProducts,
  AllProducts,
  SingleProductData,
} from "../controllers/products.controllers.js";

const ProductsRoutes = Router();

ProductsRoutes.post("/add-product", AddProduct); // seller
ProductsRoutes.post("/added-products", AddedProducts); // seller
ProductsRoutes.get("/all-products", AllProducts); // user
ProductsRoutes.post("/single-product-data", SingleProductData); // user

export default ProductsRoutes;
