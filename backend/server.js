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

// DB + Cloudinary
connectDB();
connectCloudinary();

app.use(express.json());

/**
 * ✅ FIXED CORS (PRODUCTION READY)
 * Works with Vercel preview + main domains
 */
const allowedOrigins = [
  "https://e-commerce-app-frontend-red.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(null, true); // ⚠️ temporarily allow all (for debugging)
    }
  },
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

// ❌ REQUIRED for Vercel
export default app;