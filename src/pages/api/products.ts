// src/pages/api/products.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    try {
        if (req.method === "GET") {
            const products = await Product.find();
            console.log("Fetched products:", products); // Logs the fetched products

            if (!products.length) {
                return res.status(404).json({ message: "No products found" });
            }

            return res.status(200).json(products);
        } else {
            return res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error: any) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}
