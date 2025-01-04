import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    await dbConnect();
    req.method === "GET"
    return res.json(await Product.find());
}
