// src/razorpay.d.ts
declare module "razorpay" {
  interface RazorpayOptions {
    key_id: string;
    key_secret: string;
  }

  interface RazorpayOrderOptions {
    amount: number;
    currency: string;
  }

  class Razorpay {
    constructor(options: RazorpayOptions);
    orders: {
      create(options: RazorpayOrderOptions): Promise<any>;
    };
  }

  export default Razorpay;
}

// Client-side Razorpay
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface Window {
  Razorpay: {
    Checkout: new (options: RazorpayOptions) => {
      open(): void;
    };
  };
}

declare const Razorpay: Window["Razorpay"]["Checkout"];
