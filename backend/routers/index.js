import { Router } from "express";
import authRouters from "./auth.routers.js";
import productsRouters from "./products.route.js";
import { cookieToken } from "../services/token.service.js";
// import userRouters from "./user.router.js";

const allRouters = Router();

allRouters.use("/auth", authRouters);
allRouters.use("/product", productsRouters);
// allRouters.use("/user", cookieToken, userRouters);

export default allRouters;
