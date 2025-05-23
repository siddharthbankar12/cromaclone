import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import allRouters from "./routers/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { initSocket } from "./services/socket.service.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

export const io = initSocket(server);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://cromaclone.vercel.app"],
    credentials: true,
  })
);

const port = 8000;

app.get("/", (req, res) => {
  return res.send("Welcome to backend server");
});

app.use("/api/v1", allRouters);

mongoose
  .connect(process.env.CROMADB)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

server.listen(port, () => console.log(`Server is running on port ${port}`));
