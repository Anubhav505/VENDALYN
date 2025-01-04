import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { orderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!orderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const secret = process.env.RAZORPAY_SECRET!;
    const body = `${orderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpaySignature) {
      return res.status(200).json({ isOk: true });
    } else {
      return res.status(400).json({ isOk: false });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
