import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// DB connections
connectDB();
connectCloudinary();

// ---------------- MIDDLEWARES ----------------

// JSON parser
app.use(express.json());

// CORS (clean & production-safe)
app.use(cors({
  origin: "https://e-commerce-app-frontend-red.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true
}));

s


// ---------------- ROUTES ----------------

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Health check
app.get("/", (req, res) => {
  res.send("API Working");
});

// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log("Server started on PORT: " + port);
});