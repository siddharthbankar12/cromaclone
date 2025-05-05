import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import allRouters from "./routers/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
app.use(express.json());

// "http://localhost:3000"
// https://cromaclone.vercel.app

const corsOptions = {
  origin: ["https://cromaclone.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

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

app.listen(port, () => console.log(`Server is running on port ${port}`));
