'use client';

import React, { useState } from 'react';
import Script from 'next/script';

interface BuyProps {
    amount: number; // Amount in paise (1000 = ₹10)
    customerName?: string;
    customerEmail?: string;
    customerContact?: string;
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    handler: (response: { razorpay_payment_id: string; razorpay_signature: string }) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: {
        color: string;
    };
}

interface RazorpayWindow extends Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
}

const Buy: React.FC<BuyProps> = ({
    amount,
    customerName = 'Customer Name',
    customerEmail = 'customer@example.com',
    customerContact = '9999999999',
}) => {
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        const response = await fetch('/api/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        const order = await response.json();

        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

        const razorpayOptions: RazorpayOptions = {
            key: razorpayKey!,
            amount: order.amount,
            currency: 'INR',
            name: 'VENDALYN',
            description: 'Product Description',
            image: '/favicon.png',
            order_id: order.id,
            handler: async (response: { razorpay_payment_id: string; razorpay_signature: string }) => {
                const verifyResponse = await fetch('/api/verifyOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderId: order.id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    }),
                });

                const verifyData = await verifyResponse.json();
                if (verifyData.isOk) {
                    setPaymentSuccess(true);
                    alert('Payment was successful!');
                } else {
                    alert('Payment verification failed');
                }
            },
            prefill: {
                name: customerName,
                email: customerEmail,
                contact: customerContact,
            },
            theme: {
                color: '#3399cc',
            },
        };

        const razorpay = new ((window as unknown) as RazorpayWindow).Razorpay(razorpayOptions);
        razorpay.open();

        setLoading(false);
    };

    return (
        <div>
            <Script
                type="text/javascript"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />

            {paymentSuccess && (
                <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
                    Payment was successful! Thank you for your purchase.
                </div>
            )}

            <button
                onClick={handlePayment}
                disabled={loading}
                className="mt-4 bg-black py-3 px-6 rounded-md text-white w-full hover:bg-gray-600 transition-colors duration-300 ease-in-out"
            >
                {loading ? 'Processing...' : 'BUY NOW'}
            </button>
        </div>
    );
};

export default Buy;