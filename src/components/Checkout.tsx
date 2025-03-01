"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import RazorpayPayment from "@/components/RazorpayPayment";
import Image from "next/image";

interface UserDetails {
    name: string;
    email: string;
    contact: string;
    address: string;
    pinCode: string;
}

function CheckoutPage() {
    const searchParams = useSearchParams();
    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: "",
        email: "",
        contact: "",
        address: "",
        pinCode: "",
    });
    const [couponCode, setCouponCode] = useState("");
    const [finalPrice, setFinalPrice] = useState<number | null>(null);
    const [couponApplied, setCouponApplied] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [showCouponCodes, setShowCouponCodes] = useState(false); // State for showing coupon codes
    const [availableCoupons] = useState(["HOLI10 : Flat 10% off for shopping above Rs. 499"]); // Example coupons

    // Extract search parameters
    const name = searchParams?.get("name");
    const price = searchParams?.get("price");
    const image = searchParams?.get("image");
    const size = searchParams?.get("size");
    const quantity = searchParams?.get("quantity");

    // Product data calculation
    const productData = {
        name: name || "Product Name",
        price: parseFloat(price || "0"),
        image: image || "/placeholder.png",
        size: size || "N/A",
        quantity: parseInt(quantity || "1"),
    };

    const totalAmount = productData.price * productData.quantity;
    const finalAmount = finalPrice !== null ? finalPrice : totalAmount;
    const discountAmount = totalAmount - finalAmount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails(prev => {
            const updated = { ...prev, [name]: value };
            setIsFormComplete(Object.values(updated).every(val => val.trim() !== ""));
            return updated;
        });
    };

    const applyCoupon = () => {
        if (couponCode.trim().toUpperCase() === "HOLI10" && totalAmount > 499) {
            setFinalPrice(totalAmount * 0.9);
            setCouponApplied(true);
        } else {
            alert("Invalid coupon or minimum price must be ₹499.");
            setCouponApplied(false);
            setFinalPrice(null);
        }
    };

    return (
        <div className="w-full p-4 mb-32 mt-6 max-w-6xl mx-auto bg-white rounded-xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
                Secure Checkout
            </h1>

            <div className="w-full flex flex-col lg:flex-row gap-8">
                {/* Product Preview */}
                <div className="lg:w-1/3 p-6 rounded-xl">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                            src={productData.image}
                            alt={productData.name}
                            fill
                            className="object-contain p-4"
                        />
                    </div>
                    <div className="mt-6 space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900">{productData.name}</h2>
                        <div className="text-gray-600">
                            <div>Size: <strong>{productData.size}</strong></div>
                            <div>Qty: <strong>{productData.quantity}</strong></div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={userDetails.name}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    PIN Code
                                </label>
                                <input
                                    type="text"
                                    name="pinCode"
                                    value={userDetails.pinCode}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={userDetails.contact}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Shipping Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={userDetails.address}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="lg:w-1/3">
                    <div className="p-6 rounded-xl">
                        {/* Conditionally render the coupon section based on price */}
                        {totalAmount > 499 && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Apply Coupon</h2>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter coupon code"
                                        className="flex-1 p-3 border border-gray-300 rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={applyCoupon}
                                        className="p-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                                    >
                                        Apply
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowCouponCodes(!showCouponCodes)}
                                    className="mt-2 text-sm text-blue-600 hover:underline"
                                >
                                    See all coupon codes
                                </button>
                                {showCouponCodes && (
                                    <ul className="mt-2 text-sm text-gray-700">
                                        {availableCoupons.map((coupon, index) => (
                                            <li key={index}>{coupon}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {couponApplied && (
                            <div className="mt-4 flex items-center justify-between bg-green-100 p-3 rounded-lg">
                                <span className="text-green-700 text-sm">Coupon Applied!</span>
                                <button
                                    onClick={() => {
                                        setCouponCode("");
                                        setCouponApplied(false);
                                        setFinalPrice(null);
                                    }}
                                    className="text-red-600 text-sm font-medium hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Item Price:</span>
                                <span>₹{Math.round(totalAmount)}</span>
                            </div>
                            {couponApplied && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Discount:</span>
                                    <span className="text-red-600">-₹{Math.round(discountAmount)}</span>
                                </div>
                            )}
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg">Total:</span>
                                    <span className="text-2xl font-bold">₹{Math.round(finalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {!isFormComplete && (
                            <p className="text-sm text-red-600">
                                Please fill contact Information before payment
                            </p>
                        )}
                        <div className={!isFormComplete ? "opacity-50 pointer-events-none" : ""}>
                            <RazorpayPayment
                                amount={finalAmount}
                                productName={productData.name}
                                userDetails={userDetails}
                                size={productData.size}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPageWrapper() {
    return (
        <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            <CheckoutPage />
        </Suspense>
    );
}


