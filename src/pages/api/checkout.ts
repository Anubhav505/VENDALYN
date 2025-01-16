import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { Shipment } from "@/models/Shipment";

interface ApiResponse {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { payment, ...shipmentDetails } = req.body;

    // Only save the payment method if the payment is "COD"
    if (payment === "cod") {
      // If payment is "COD", include payment method in the data to save in DB
      const shipment = new Shipment({
        ...shipmentDetails,
        payment, // Save payment method here
      });
      await shipment.save();
    } else {
      // If payment is "razorpay", don't save the payment method
      const shipment = new Shipment({
        ...shipmentDetails,
      });
      await shipment.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Shipment saved successfully!" });
  } catch (error) {
    console.error("Error saving shipment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
