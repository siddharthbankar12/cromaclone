import { Router } from "express";
import authRouters from "./auth.routers.js";
// import userRouters from "./user.router.js";

const allRouters = Router();

allRouters.use("/auth", authRouters);
// allRouters.use("/user", userRouters);

export default allRouters;
