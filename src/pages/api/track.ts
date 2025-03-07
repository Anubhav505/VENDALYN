import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const { awb } = req.query;
    if (!awb) {
        res.status(400).json({ error: "AWB number is required" });
        return;
    }

    try {
        const response = await fetch(
            `https://track.delhivery.com/api/v1/packages/json/?waybill=${awb}`,
            {
                headers: {
                    Authorization:
                        "Token 9fb15ec25f4890487f413facfbbc7840aede7260", // Your live API key
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Failed to fetch tracking details" });
    }
}
