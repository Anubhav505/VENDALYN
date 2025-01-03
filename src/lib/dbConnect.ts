import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Extend global type for mongoose caching
declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;

// Initialize cache if it doesn't exist
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<mongoose.Connection> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => {
        console.log(
          "DB connected successfully:",
          mongooseInstance.connection.name
        );
        return mongooseInstance.connection;
      })
      .catch((error) => {
        console.error("Error connecting to DB:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
