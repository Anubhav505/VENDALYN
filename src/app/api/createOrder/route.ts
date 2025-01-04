// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
//   key_secret: process.env.RAZORPAY_SECRET_ID,
// });

// export async function POST(req: Request) {
//   const { amount } = await req.json();
//   const order = await razorpay.orders.create({
//     amount,
//     currency: "INR",
//   });

//   return NextResponse.json(order);
// }

import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET_ID as string,
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const order = await razorpay.orders.create({
      amount, // Amount in paise
      currency: "INR",
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
