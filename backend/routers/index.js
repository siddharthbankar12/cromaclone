import { Router } from "express";
import authRouters from "./auth.routers.js";
import productsRouters from "./products.route.js";
import { cookieToken } from "../services/token.service.js";
import UserRouters from "./user.router.js";
import adminRouters from "./admin.route.js";
import contactFormRouters from "./contactForm.route.js";

const allRouters = Router();

allRouters.use("/auth", authRouters);
allRouters.use("/product", productsRouters);
allRouters.use("/user", cookieToken, UserRouters);
allRouters.use("/admin", cookieToken, adminRouters);
allRouters.use("/form", contactFormRouters);

export default allRouters;
