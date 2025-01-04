import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } =
      await request.json();

    if (!orderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_SECRET!;
    const body = `${orderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpaySignature) {
      return NextResponse.json({ isOk: true });
    } else {
      return NextResponse.json({ isOk: false });
    }
  } catch (error: unknown) {
    console.error("Error verifying Razorpay payment:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
