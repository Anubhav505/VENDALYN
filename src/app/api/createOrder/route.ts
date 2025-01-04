import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  const { amount } = await request.json();

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET!,
  });

  try {
    const options = {
      amount: amount,
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ message : "hi" }, { status: 500 });
  }
}
