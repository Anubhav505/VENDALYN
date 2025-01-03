import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const products = await Product.find();
      if (!products.length) {
        return res.status(404).json({ message: "No products found" });
      }
      return res.status(200).json(products);
    } catch (error: unknown) {
      // Type assertion to ensure error is an instance of Error
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ message: "Server Error", error: error.message });
      }
      return res
        .status(500)
        .json({ message: "Server Error", error: "Unknown error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
