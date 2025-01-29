'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Combos from '@/components/Combos';
import Script from 'next/script';

interface Combo {
    _id: string;
    name: string;
    d_1: string;
    d_2: string;
    d_3: string;
    d_4: string;
    d_5: string;
    d_6: string;
    price: number;
    image_1: string;
    image_2: string;
    image_3: string;
    features?: string[];
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
        address: string;
        pinCode: string;
    };
    theme: {
        color: string;
    };
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => { open: () => void };
    }
}

export default function ComboPage() {
    const { id: comboId } = useParams() || {};
    const [combo, setCombo] = useState<Combo | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        contact: '',
        address: '',
        pinCode: '',
    });
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/combos/${comboId}`)
            .then((res) => res.json())
            .then(setCombo)
            .catch((err) => console.error('Error fetching product:', err));
    }, [comboId]);

    const handleRazorpayLoad = () => {
        if (window.Razorpay) {
            setRazorpayLoaded(true);
        } else {
            console.error("Razorpay did not load properly.");
        }
    };

    if (!combo) return <div>Loading...</div>;

    const handlePayment = async () => {
        const missingFields = [];

        if (!userDetails.name) missingFields.push('Name');
        if (!userDetails.email) missingFields.push('Email');
        if (!userDetails.contact) missingFields.push('Contact Number');
        if (!userDetails.address) missingFields.push('Address');
        if (!userDetails.pinCode) missingFields.push('Pin Code');
        if (!selectedSize) missingFields.push('Size');

        if (missingFields.length > 0) {
            alert(`Please fill in the following fields before proceeding to payment: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await fetch('/api/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: combo.price * 100 }),
            });

            if (!response.ok) {
                throw new Error('Failed to create Razorpay order');
            }

            const order = await response.json();
            if (!order || !order.id || !order.amount) {
                throw new Error('Invalid order data');
            }

            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            if (!razorpayKey) {
                throw new Error('Razorpay key is not defined');
            }

            const razorpayOptions: RazorpayOptions = {
                key: razorpayKey,
                amount: order.amount,
                currency: 'INR',
                name: 'VENDALYN',
                description: `${combo.name}\nAddress: ${userDetails.address}\nPin Code: ${userDetails.pinCode}\nSize: ${selectedSize}`,
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
                        alert('Payment was successful!');
                    } else {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: userDetails.name,
                    email: userDetails.email,
                    contact: userDetails.contact,
                    address: userDetails.address,
                    pinCode: userDetails.pinCode,
                },
                theme: {
                    color: '#3399cc',
                },
            };

            if (razorpayLoaded) {
                const razorpay = new window.Razorpay(razorpayOptions);
                razorpay.open();
            } else {
                alert('Razorpay is not loaded. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Payment failed. Please try again.');
        }
    };

    const images = [combo.image_1, combo.image_2, combo.image_3].filter(Boolean);

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6 md:p-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    <div>
                        <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer">
                            <Image
                                src={images[selectedImage]}
                                alt={combo.name}
                                layout="fill"
                                objectFit="cover"
                                className="hover:scale-105 transition-transform duration-300"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg cursor-pointer"
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${combo.name} - ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="hover:opacity-80 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{combo.name}</h1>
                            <div className="text-2xl md:text-3xl text-primary mt-2 flex gap-2">
                                <span className="text-xl md:text-xl text-gray-500 line-through">₹2599</span>
                                <span className="text-xl md:text-xl">₹{combo.price.toFixed(2)}</span>
                            </div>
                            <div className="mt-6">
                                <div className="text-xl font-bold mb-4">Select Size:</div>
                                <div className="flex gap-4">
                                    {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border rounded-md ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {!selectedSize && (
                                    <p className="text-red-500 mt-2 text-sm"><b>Please select a size to proceed</b></p>
                                )}
                            </div>
                            <div>
                            <ul className="list-disc pl-5">
                            {[combo.d_1, combo.d_2, combo.d_3, combo.d_4, combo.d_5, combo.d_6]
                            .filter(Boolean)
                            .map((value, index) => <li key={index}>{value}</li>)}</ul>
                        </div>
                        </div>

                        <div className="mt-6">
                            {!showForm ? (
                                <button
                                    onClick={() => {
                                        if (!selectedSize) {
                                            alert('Please select a size before proceeding.');
                                        } else {
                                            setShowForm(true);
                                        }
                                    }}
                                    className={`mt-4 py-3 px-6 rounded-md text-white w-full ${!selectedSize ? 'bg-gray-400' : 'bg-black'} hover:bg-gray-600 transition-colors duration-300 ease-in-out`}
                                    disabled={!selectedSize}
                                >
                                    BUY NOW
                                </button>
                            ) : (
                                <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        className="w-full p-2 mb-4 border rounded"
                                        value={userDetails.name}
                                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="w-full p-2 mb-4 border rounded"
                                        value={userDetails.email}
                                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Contact Number"
                                        className="w-full p-2 mb-4 border rounded"
                                        value={userDetails.contact}
                                        onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Address"
                                        className="w-full p-2 mb-4 border rounded"
                                        value={userDetails.address}
                                        onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Pin Code"
                                        className="w-full p-2 mb-4 border rounded"
                                        value={userDetails.pinCode}
                                        onChange={(e) => setUserDetails({ ...userDetails, pinCode: e.target.value })}
                                    />
                                    <button
                                        type="submit"
                                        onClick={handlePayment}
                                        className="mt-4 bg-black py-3 px-6 rounded-md text-white w-full hover:bg-gray-600 transition-colors duration-300 ease-in-out"
                                    >
                                        Proceed to Payment
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 flex flex-col gap-6">
                <h2 className="heading font-semibold text-[4vw] text-center">YOU MAY ALSO LIKE</h2>
                <Combos />
            </div>

            {/* Razorpay Script */}
            <Script
                type="text/javascript"
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={handleRazorpayLoad}
            />
        </>
    );
}

