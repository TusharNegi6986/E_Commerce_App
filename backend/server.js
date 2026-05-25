import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  // user frontend
  "https://e-commerce-app-frontend-red.vercel.app",

  // admin frontend
  "https://e-commerce-app-admin-gamma.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {

    console.log("Request origin:", origin);

    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked Origin:", origin);

    return callback(new Error("CORS not allowed"));
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "token"
  ]
}));