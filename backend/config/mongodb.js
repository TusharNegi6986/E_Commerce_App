import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(
      "Mongo URI exists:",
      !!process.env.MONGO_DB_URI
    );

    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "ecommerce",
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ DB Connected");

    mongoose.connection.on("error", (err) => {
      console.log("❌ DB Error:", err.message);
    });

  } catch (error) {
    console.log(
      "❌ MongoDB Connection Failed:",
      error.message
    );
  }
};

export default connectDB;