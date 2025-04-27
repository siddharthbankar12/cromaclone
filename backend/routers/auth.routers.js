import { Router } from "express";
import {
  getCurrentUser,
  login,
  register,
} from "../controllers/auth.controllers.js";

const authRouters = Router();

authRouters.post("/register", register);
authRouters.post("/login", login);
authRouters.post("/get-current-user", getCurrentUser);

export default authRouters;
