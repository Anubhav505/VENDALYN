// src/razorpay.d.ts
declare class Razorpay {
  constructor(options: RazorpayOptions);
  open(): void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: RazorpayPrefillOptions;
  theme: RazorpayThemeOptions;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayPrefillOptions {
  name: string;
  email: string;
  contact: string;
}

interface RazorpayThemeOptions {
  color: string;
}
