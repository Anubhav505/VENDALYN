// pages/api/order.js
import dbConnect from "../../lib/dbConnect"; // Adjust the path to your DB connection utility
import Order from "../../models/Order"; // Adjust the path to your Order model

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    // Connect to your database (MongoDB example)
    await dbConnect();

    try {
        const { orderId, userDetails, amount, paymentId, productName } = req.body;

        // Create and save the new order document
        const newOrder = new Order({
            orderId,
            userDetails,
            productName,
            amount,
            paymentId,
            createdAt: new Date(),
        });

        await newOrder.save();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ success: false, error: "Failed to save order" });
    }
}
