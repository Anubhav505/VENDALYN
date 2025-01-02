// lib/dbConnect.ts
import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("DB connected successfully", db.connection.name);
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw new Error("Error connecting to DB");
  }
};

export default dbConnect;
