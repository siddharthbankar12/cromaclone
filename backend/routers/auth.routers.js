import { Router } from "express";
import {
  getCurrentUser,
  Login,
  logOutUser,
  Register,
  updateCurrentUser,
} from "../controllers/auth.controllers.js";
import { cookieToken } from "../services/token.service.js";

const authRouters = Router();

authRouters.post("/register", Register);
authRouters.post("/login", Login);
authRouters.post("/get-current-user", cookieToken, getCurrentUser);
authRouters.post("/update-current-user", cookieToken, updateCurrentUser);
authRouters.put("/logout", cookieToken, logOutUser);

export default authRouters;
