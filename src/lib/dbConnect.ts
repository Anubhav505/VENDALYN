import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to DB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("DB connected successfully", mongoose.connection.name);
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw new Error("Error connecting to DB");
  }
};

export default dbConnect;
