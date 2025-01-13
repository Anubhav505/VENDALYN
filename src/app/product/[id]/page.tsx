'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';
import Image from 'next/image';
import Products from '@/components/Products';
import Script from 'next/script';

interface Product {
    _id: string;
    name: string;
    description: string;
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

export default function ProductPage() {
    const { id: productId } = useParams() || {};
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        contact: '',
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then((res) => res.json())
            .then(setProduct)
            .catch((err) => console.error('Error fetching product:', err));
    }, [productId]);

    // This effect will set Razorpay as loaded when the script is fully loaded
    const handleRazorpayLoad = () => {
        if (window.Razorpay) {
            setRazorpayLoaded(true);
        } else {
            console.error("Razorpay did not load properly.");
        }
    };

    if (!product) return <div>Loading...</div>;

    // Function to handle the payment process
    const handlePayment = async () => {
        // Validate user details
        if (!userDetails.name || !userDetails.email || !userDetails.contact) {
            alert('Please fill in all the details before proceeding to payment.');
            return;
        }

        try {
            const response = await fetch('/api/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: product.price * 100 }), // Amount in paise
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
                description: product.name,
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
                    name: userDetails.name,
                    email: userDetails.email,
                    contact: userDetails.contact,
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

    const images = [product.image_1, product.image_2, product.image_3].filter(Boolean);

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6 md:p-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Media Gallery */}
                    <div>
                        <div
                            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Image
                                src={images[selectedImage]}
                                alt={product.name}
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
                                        alt={`${product.name} - ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="hover:opacity-80 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
                            <div className="text-2xl md:text-3xl text-primary mt-2 flex gap-2">
                                <span className="text-xl md:text-xl text-gray-500 line-through">₹2599</span>
                                <span className="text-xl md:text-xl">₹{product.price.toFixed(2)}</span>
                            </div>
                            <p className="mt-4 text-gray-700">{product.description}</p>
                            <div>
                                <h2 className="text-xl font-bold mt-6">Key Features:</h2>
                                <ul className='list-disc pl-5'>
                                    <li><b>Fabric</b>: Made from high-quality fleece cotton, ensuring a soft, breathable, and comfortable fit throughout the day.</li>
                                    <li><b>Design</b>: Features a unique Vintage Drip Design, giving it a trendy, urban look. The balaclava-style hood offers extra warmth and coverage, perfect for those chilly days.</li>
                                    <li><b>Color</b>: Classic Black – A versatile color that pairs well with any outfit.</li>
                                    <li><b>Size Range</b>: Available in sizes S, M, L, XL, 2XL, ensuring a perfect fit for all body types.</li>
                                    <li><b>Neckline</b>: The hooded balaclava neckline gives added protection and style, ideal for both fashion and function.</li>
                                    <li><b>Gender</b>: Designed to be unisex, making it perfect for both men and women of all ages.</li>
                                    <li><b>Age Group</b>: Suitable for all ages, making it a great option for the entire family.</li>
                                </ul>
                            </div>
                            {product.features && (
                                <ul className="mt-6 space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="mt-6">
                            {/* Show form before payment */}
                            {!showForm ? (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="mt-4 bg-black py-3 px-6 rounded-md text-white w-full hover:bg-gray-600 transition-colors duration-300 ease-in-out"
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

                {/* Image Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-4xl">
                            <button
                                className="absolute top-4 right-4 text-white"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <X className="h-6 w-6 bg-black rounded-lg" />
                            </button>
                            <Image
                                src={images[selectedImage]}
                                alt={product.name}
                                width={800}
                                height={800}
                                className="object-contain"
                            />
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${selectedImage === index ? 'bg-white' : 'bg-gray-500'}`}
                                        onClick={() => setSelectedImage(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {paymentSuccess && (
                <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
                    Payment was successful! Thank you for your purchase.
                </div>
            )}

            <div className="mt-12 flex flex-col gap-6">
                <h2 className="heading font-semibold text-[4vw] text-center">YOU MAY ALSO LIKE</h2>
                <Products />
            </div>

            {/* Razorpay Script */}
            <Script
                type="text/javascript"
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={handleRazorpayLoad} // Ensure Razorpay is loaded
            />
        </>
    );
}
