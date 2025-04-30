import { Router } from "express";
import authRouters from "./auth.routers.js";
import ProductsRoutes from "./products.route.js";
// import userRouters from "./user.router.js";

const allRouters = Router();

allRouters.use("/auth", authRouters);
allRouters.use("/product", ProductsRoutes);

export default allRouters;
