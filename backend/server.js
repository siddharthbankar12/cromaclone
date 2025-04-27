import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import allRouters from "./routers/index.js";
import cors from "cors";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const port = 8000;

app.get("/", (req, res) => {
  return res.send("Welcome to backend server");
});

app.use("/api/v1", allRouters);

mongoose.connect(process.env.CROMADB).then(() => {
  console.log("MongoDB Connected");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
