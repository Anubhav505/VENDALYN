import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    try {
      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_SECRET!,
      });

      const options = {
        amount: amount * 100, // amount in paise
        currency: "INR",
      };

      const order: RazorpayOrderResponse = await razorpay.orders.create(
        options
      );
      return res.status(200).json(order);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
