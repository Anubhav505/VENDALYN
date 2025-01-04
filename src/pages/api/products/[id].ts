import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.json({ message: "Method not allowed" });
  await dbConnect();
  const id = req.query.id;
  return res.json(await Product.findById(id));
}
