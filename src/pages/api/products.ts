import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const products = await Product.find();
      return res.json(products);
    } else {
      return res.json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
  }
}
