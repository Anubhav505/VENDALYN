'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

declare global {
    interface Window {
        Razorpay: {
            Checkout: new (options: any) => {
                open: () => void;
            };
        };
    }
}

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!params?.id) {
            setError('Product ID not found');
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params?.id]);

    const handleBuyNow = async () => {
        if (!product) return;

        try {
            // Create Razorpay order
            const orderResponse = await fetch('/api/createOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: product.price * 100 }), // Convert to paise
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create Razorpay order');
            }

            const orderData = await orderResponse.json();

            // Load Razorpay script dynamically
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                const razorpayOptions = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: 'VENDALYN',
                    description: product.name,
                    image: '/favicon.png',
                    order_id: orderData.id,
                    handler: async (response: { razorpay_payment_id: string; razorpay_signature: string }) => {
                        try {
                            // Verify payment
                            const verifyResponse = await fetch('/api/verifyOrder', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    orderId: orderData.id,
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpaySignature: response.razorpay_signature,
                                }),
                            });

                            const verifyData = await verifyResponse.json();

                            if (verifyData.isOk) {
                                alert('Payment successful!');
                            } else {
                                alert('Payment verification failed');
                            }
                        } catch (err) {
                            console.error('Verification error:', err);
                            alert('Payment verification error');
                        }
                    },
                    prefill: {
                        name: 'Customer Name',
                        email: 'customer@example.com',
                        contact: '9999999999',
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                const razorpay = new window.Razorpay.Checkout(razorpayOptions);
                razorpay.open();
            };

            script.onerror = () => {
                throw new Error('Failed to load Razorpay SDK');
            };

            document.body.appendChild(script);
        } catch (err) {
            console.error('Payment error:', err);
            alert('Failed to initiate payment');
        }
    };

    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
    if (!product) return <div className="text-center p-8">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[500px]">
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-lg"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <div className="text-2xl font-semibold mb-6">
                        ₹{product.price.toFixed(2)}
                    </div>
                    <button className="border-black border py-3 px-6 rounded-md hover:bg-black hover:text-white transition-colors">
                        ADD TO CART
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="mt-4 bg-black py-3 px-6 rounded-md text-white font-bold"
                    >
                        BUY NOW
                    </button>
                </div>
            </div>
        </div>
    );
}
