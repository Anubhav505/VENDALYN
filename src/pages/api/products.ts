import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connect to the database
    await dbConnect();

    // Handle GET request
    if (req.method === "GET") {
      const products = await Product.find().limit(50); // Limit results for performance
      if (!products.length) {
        return res.status(404).json({ message: "No products found" });
      }
      return res.status(200).json(products);
    } else {
      // Handle unsupported methods
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error: unknown) {
    // Error handling
    console.error("Error fetching products:", error);
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
    return res.status(500).json({ message: "Unknown Server Error" });
  }
}
