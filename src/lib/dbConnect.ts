// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// // Extend global type for mongoose caching
// declare global {
//   // Allow global `var` declarations
//   // eslint-disable-next-line no-var
//   var mongoose: {
//     conn: mongoose.Connection | null;
//     promise: Promise<mongoose.Connection> | null;
//   };
// }

// let cached = global.mongoose;

// // Initialize cache if it doesn't exist
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const dbConnect = async (): Promise<mongoose.Connection> => {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI)
//       .then((mongooseInstance) => {
//         console.log(
//           "DB connected successfully:",
//           mongooseInstance.connection.name
//         );
//         return mongooseInstance.connection;
//       })
//       .catch((error) => {
//         console.error("Error connecting to DB:", error);
//         throw error;
//       });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// };

// export default dbConnect;

import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;
