"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Script from "next/script";

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
            new(options: object): {
                open(): void;
            };
        };
    }
}

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [amount, setAmount] = useState<number>(0);
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
                setAmount(data.price); // Set default amount to product price
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params?.id]);

    const handlePayment = async () => {
        if (amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            const orderResponse = await fetch("/api/createOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amount * 100 }), // Convert to paise
            });

            if (!orderResponse.ok) throw new Error("Failed to create Razorpay order");

            const orderData = await orderResponse.json();

            const razorpayOptions = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "VENDALYN",
                description: product?.name || "Purchase",
                image: "/favicon.png",
                order_id: orderData.id,
                handler: async (response: {
                    razorpay_payment_id: string;
                    razorpay_order_id: string;
                    razorpay_signature: string;
                }) => {
                    try {
                        const verifyResponse = await fetch("/api/verifyOrder", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                orderId: response.razorpay_order_id,
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
        } catch (err) {
            console.error("Payment error:", err);
            alert("Failed to initiate payment");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <Image src={product.image} alt={product.name} width={500} height={500} />
            <h1 className="text-xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold">₹{product.price.toFixed(2)}</p>

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="px-4 py-2 rounded-md text-black border"
                placeholder="Enter amount"
            />

            <button
                onClick={handlePayment}
                className="bg-green-500 text-white px-6 py-2 rounded-md"
            >
                Buy Now
            </button>
        </div>
    );
}
