import { Router } from "express";
import {
  getCurrentUser,
  Login,
  Register,
  updateCurrentUser,
} from "../controllers/auth.controllers.js";

const authRouters = Router();

authRouters.post("/register", Register);
authRouters.post("/login", Login);
authRouters.post("/get-current-user", getCurrentUser);
authRouters.post("/update-current-user", updateCurrentUser);

export default authRouters;
