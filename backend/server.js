import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// DB
connectDB();
connectCloudinary();

// middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://e-commerce-app-frontend-red.vercel.app",
  "https://e-commerce-app-admin-gamma.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// LOCAL DEVELOPMENT
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});

// FOR VERCEL
export default app;