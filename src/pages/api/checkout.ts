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

    // Check if all required fields are provided
    if (
      !shipmentDetails.user_name ||
      !shipmentDetails.address ||
      !shipmentDetails.pin_code
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Only save the payment method if the payment is "COD"
    const shipment = new Shipment({
      ...shipmentDetails,
      payment: payment === "cod" ? payment : undefined,
    });

    await shipment.save();

    res
      .status(200)
      .json({ success: true, message: "Shipment saved successfully!" });
  } catch (error) {
    console.error("Error saving shipment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
