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
        Razorpay: any;
    }
}

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!params?.id) {
            setError("Product ID not found");
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${params.id}`);
                if (!response.ok) throw new Error("Failed to fetch product");

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params?.id]);

    const handleBuyNow = async () => {
        if (!product) return;

        try {
            const orderResponse = await fetch('/api/createOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: product.price * 100 }), // Convert to paise
            });

            if (!orderResponse.ok) throw new Error("Failed to create Razorpay order");

            const orderData = await orderResponse.json();

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                if (!window.Razorpay) throw new Error("Razorpay SDK not found");

                const razorpayOptions = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: "VENDALYN",
                    description: product.name,
                    image: "/favicon.png",
                    order_id: orderData.id,
                    handler: async (response: {
                        razorpay_payment_id: string;
                        razorpay_signature: string;
                    }) => {
                        try {
                            const verifyResponse = await fetch("/api/verifyOrder", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    orderId: orderData.id,
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpaySignature: response.razorpay_signature,
                                }),
                            });

                            const verifyData = await verifyResponse.json();
                            if (verifyData.isOk) alert("Payment successful!");
                            else alert("Payment verification failed");
                        } catch (err) {
                            console.error("Verification error:", err);
                            alert("Payment verification error");
                        }
                    },
                    prefill: {
                        name: "Customer Name",
                        email: "customer@example.com",
                        contact: "9999999999",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const razorpay = new window.Razorpay(razorpayOptions);
                razorpay.open();
            };

            script.onerror = () => {
                throw new Error("Failed to load Razorpay SDK");
            };

            document.body.appendChild(script);
        } catch (err) {
            console.error("Payment error:", err);
            alert("Failed to initiate payment");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <Image src={product.image} alt={product.name} width={500} height={500} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>₹{product.price.toFixed(2)}</p>
            <button onClick={handleBuyNow}>Buy Now</button>
        </div>
    );
}
