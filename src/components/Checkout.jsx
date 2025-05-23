"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RazorpayPayment from "@/components/RazorpayPayment";
import Image from "next/image";

const CartCheckout = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [cartItems, setCartItems] = useState([]);
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        pinCode: "",
    });
    const [couponCode, setCouponCode] = useState("");
    const [finalPrice, setFinalPrice] = useState(null);
    const [couponApplied, setCouponApplied] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
        if (searchParams) {
            const directBuyId = searchParams.get("id");
            if (directBuyId) {
                const directProduct = {
                    id: directBuyId,
                    name: searchParams.get("name") || "Product Name",
                    price: parseFloat(searchParams.get("price") || "0"),
                    image: searchParams.get("image") || "/placeholder.png",
                    size: searchParams.get("size") || "N/A",
                    quantity: parseInt(searchParams.get("quantity") || "1"),
                };
                setCartItems([directProduct]);
            } else {
                const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
                setCartItems(storedCart);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        setIsFormComplete(Object.values(userDetails).every((val) => val.trim() !== ""));
    }, [userDetails]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const formatPrice = (price) => `₹${price.toFixed(2)}`;

    const applyCoupon = () => {
        const totalAmount = calculateTotal();
        if (couponCode.trim().toUpperCase() === "HOLI10" && totalAmount > 499) {
            setFinalPrice(Math.round(totalAmount * 0.9));
            setCouponApplied(true);
        } else {
            alert("Invalid coupon or minimum price must be ₹499.");
            setCouponApplied(false);
            setFinalPrice(null);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const finalAmount = finalPrice !== null ? finalPrice : calculateTotal();
    const discountAmount = calculateTotal() - finalAmount;

    return (
        <div className="p-4 max-w-6xl mx-auto bg-white min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Secure Checkout</h1>

            {cartItems.length > 0 ? (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto mb-8">
                        <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-3 border">Product</th>
                                    <th className="p-3 border">Size</th>
                                    <th className="p-3 border">Price</th>
                                    <th className="p-3 border">Quantity</th>
                                    <th className="p-3 border">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={`${item.id}-${item.size}`} className="border">
                                        <td className="p-3 border flex items-center gap-3">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                                className="rounded"
                                            />
                                            <span className="text-sm">{item.name}</span>
                                        </td>
                                        <td className="p-3 border text-center">{item.size}</td>
                                        <td className="p-3 border text-center">{formatPrice(item.price)}</td>
                                        <td className="p-3 border text-center">{item.quantity}</td>
                                        <td className="p-3 border text-center">{formatPrice(item.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile List */}
                    <div className="md:hidden mb-6">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="border rounded-lg mb-4 p-3">
                                <div className="flex gap-3">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                            <div>Size: {item.size}</div>
                                            <div>Price: {formatPrice(item.price)}</div>
                                            <div>Qty: {item.quantity}</div>
                                            <div>Total: {formatPrice(item.price * item.quantity)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="p-4 space-y-4 bg-gray-50 rounded-lg mb-6">
                        <h2 className="font-bold text-lg">Contact Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(userDetails).map(([field, value]) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                        {field.replace(/([A-Z])/g, " $1").trim()}
                                    </label>
                                    <input
                                        type={field === "email" ? "email" : "text"}
                                        name={field}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coupon Section */}
                    {calculateTotal() > 499 && (
                        <div className="p-4 bg-gray-50 rounded-lg mb-6">
                            <h2 className="font-bold text-lg mb-3">Apply Coupon</h2>
                            <div className="flex flex-col md:flex-row gap-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter coupon code"
                                    className="p-2 border rounded flex-1"
                                />
                                <button onClick={applyCoupon} className="p-2 bg-blue-600 text-white rounded">
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Order Summary */}
                    <div className="p-4 border rounded-lg bg-gray-50 mb-6">
                        <div className="flex justify-between">
                            <span>Item Total:</span>
                            <span>{formatPrice(calculateTotal())}</span>
                        </div>
                        {couponApplied && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount:</span>
                                <span>-{formatPrice(discountAmount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold border-t pt-2 mt-2">
                            <span>Final Total:</span>
                            <span>{formatPrice(finalAmount)}</span>
                        </div>
                    </div>

                    {/* Payment Section */}
                    {!isFormComplete && (
                        <p className="text-sm text-red-600 mb-4">
                            Please fill in all contact details before payment.
                        </p>
                    )}
                    <div className={`${!isFormComplete ? "opacity-50 pointer-events-none" : ""}`}>
                        <RazorpayPayment
                            amount={finalAmount}
                            productName={cartItems.map((item) => item.name).join(", ")}
                            userDetails={userDetails}
                            size="N/A"
                        />
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">Your cart is empty</p>
                    <button
                        onClick={() => router.push("/")}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartCheckout;