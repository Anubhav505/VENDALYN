// 'use client';
// import React, { useState } from 'react';
// import Script from 'next/script';

// interface BuyProps {
//     amount: number; // Amount in paise (1000 = ₹10)
//     customerName?: string;
//     customerEmail?: string;
//     customerContact?: string;
// }

// declare global {
//     interface Window {
//         Razorpay: any; // This declares Razorpay as a global object of any type
//     }
// }

// const Buy: React.FC<BuyProps> = ({
//     amount,
//     customerName = 'Customer Name',
//     customerEmail = 'customer@example.com',
//     customerContact = '9999999999',
// }) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [paymentSuccess, setPaymentSuccess] = useState(false);

//     const handlePayment = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch('/api/createOrder', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ amount }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create Razorpay order');
//             }

//             const order = await response.json();

//             const razorpayOptions = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//                 amount: order.amount,
//                 currency: 'INR',
//                 name: 'VENDALYN',
//                 description: 'Product Description',
//                 image: '/favicon.png',
//                 order_id: order.id,
//                 handler: async (response: { razorpay_payment_id: string; razorpay_signature: string }) => {
//                     try {
//                         const verifyResponse = await fetch('/api/verifyOrder', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({
//                                 orderId: order.id,
//                                 razorpayPaymentId: response.razorpay_payment_id,
//                                 razorpaySignature: response.razorpay_signature,
//                             }),
//                         });

//                         const verifyData = await verifyResponse.json();
//                         if (verifyData.isOk) {
//                             setPaymentSuccess(true);
//                             alert('Payment was successful!');
//                         } else {
//                             setError('Payment verification failed');
//                             alert('Payment verification failed');
//                         }
//                     } catch (err) {
//                         console.error('Verification error:', err);
//                         setError('Payment verification error');
//                         alert('Payment verification error');
//                     }
//                 },
//                 prefill: {
//                     name: customerName,
//                     email: customerEmail,
//                     contact: customerContact,
//                 },
//                 theme: {
//                     color: '#3399cc',
//                 },
//             };

//             const razorpay = new window.Razorpay(razorpayOptions);
//             razorpay.open();

//         } catch (err) {
//             console.error('Error:', err);
//             setError('Payment failed. Please try again.');
//             alert('Payment failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <Script
//                 type="text/javascript"
//                 src="https://checkout.razorpay.com/v1/checkout.js"
//             />

//             <button
//                 onClick={handlePayment}
//                 disabled={loading}
//                 className={`mt-4 bg-black py-3 px-6 rounded-md text-white w-full hover:bg-gray-600 transition-colors duration-300 ease-in-out`}
//             >
//                 {loading ? 'Processing...' : 'BUY NOW'}
//             </button>
//         </>
//     );
// };

// export default Buy;


// "use client";

// import Script from "next/script";
// import { useState } from "react";

// export default function Home() {
//     const [amount, setAmount] = useState<number>(0);

//     const createOrder = async () => {
//         const res = await fetch("/api/createOrder", {
//             method: "POST",
//             body: JSON.stringify({ amount: amount * 100 }),
//         });
//         const data = await res.json();

//         const paymentData = {
//             key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//             order_id: data.id,

//             handler: async function (response: any) {
//                 // verify payment
//                 const res = await fetch("/api/verifyOrder", {
//                     method: "POST",
//                     body: JSON.stringify({
//                         orderId: response.razorpay_order_id,
//                         razorpayPaymentId: response.razorpay_payment_id,
//                         razorpaySignature: response.razorpay_signature,
//                     }),
//                 });
//                 const data = await res.json();
//                 console.log(data);
//                 if (data.isOk) {
//                     // do whatever page transition you want here as payment was successful
//                     alert("Payment successful");
//                 } else {
//                     alert("Payment failed");
//                 }
//             },
//         };

//         const payment = new (window as any).Razorpay(paymentData);
//         payment.open();
//     };

//     return (
//         <div>
//             <Script
//                 type="text/javascript"
//                 src="https://checkout.razorpay.com/v1/checkout.js"
//             />

//             <input
//                 type="number"
//                 placeholder="Enter amount"
//                 className="px-4 py-2 rounded-md text-black"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//             />
//             <button
//                 className="bg-green-500 text-white px-4 py-2 rounded-md"
//                 onClick={createOrder}
//             >
//                 Create Order
//             </button>
//         </div>
//     );
// }

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
        <div className="flex w-screen h-screen items-center justify-center flex-col gap-4">
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