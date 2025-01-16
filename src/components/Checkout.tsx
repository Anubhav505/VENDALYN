"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import RazorpayPayment from "@/components/RazorpayPayment";
import axios from "axios";

function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const name = searchParams?.get("name");
    const price = searchParams?.get("price");
    const image = searchParams?.get("image");
    const size = searchParams?.get("size");

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        pinCode: "",
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod" | null>(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const productData = {
        name: name || "Product Name",
        price: parseFloat(price || "0"),
        image: image || null,
        size: size || "N/A",
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !userDetails.name ||
            !userDetails.email ||
            !userDetails.contact ||
            !userDetails.address ||
            !userDetails.pinCode
        ) {
            alert("Please fill in all fields before proceeding.");
            return;
        }
        setFormSubmitted(true);
    };

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value as "razorpay" | "cod");
    };

    const handleConfirmShipment = async () => {
        if (paymentMethod === "cod") {
            const shipmentDetails = {
                product_name: productData.name,
                price: productData.price,
                size: productData.size,
                user_name: userDetails.name,
                user_contact: userDetails.contact,
                user_email: userDetails.email,
                address: userDetails.address,
                pin_code: userDetails.pinCode,
                payment: paymentMethod,
            };

            // Trigger the order confirmation popup instead of MongoDB save
            setOrderConfirmed(true);

            try {
                const response = await axios.post("/api/checkout", shipmentDetails);
                if (!response.data.success) {
                    alert("There was an issue confirming the shipment.");
                }
            } catch (error) {
                console.error("Error with shipment confirmation:", error);
                alert("There was an error with the shipment confirmation. Please try again.");
            }
        }
    };

    const handleClosePopup = () => {
        setOrderConfirmed(false); // Close the popup
        router.push("/"); // Redirect to the homepage
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                            {productData.image ? (
                                <img
                                    src={productData.image}
                                    alt={productData.name || "Product Image"}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                                    <span className="text-gray-500">No Image Available</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{productData.name}</h2>
                            <p className="text-lg text-gray-500">
                                <strong>Size:</strong> {productData.size}
                            </p>
                            <p className="text-2xl font-bold text-primary">
                                ₹{productData.price.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {!formSubmitted ? (
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={userDetails.name}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
                                    className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={userDetails.email}
                                    onChange={handleInputChange}
                                    placeholder="Your Email"
                                    className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <input
                                    type="tel"
                                    name="contact"
                                    value={userDetails.contact}
                                    onChange={handleInputChange}
                                    placeholder="Your Contact Number"
                                    className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                    required
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={userDetails.address}
                                    onChange={handleInputChange}
                                    placeholder="Your Address"
                                    className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                name="pinCode"
                                value={userDetails.pinCode}
                                onChange={handleInputChange}
                                placeholder="Pin Code"
                                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Proceed to Payment
                            </button>
                        </form>
                    ) : (
                        <div className="mt-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Select Payment Method</h2>
                                <div className="flex flex-col">
                                    <label className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="razorpay"
                                            checked={paymentMethod === "razorpay"}
                                            onChange={handlePaymentMethodChange}
                                            className="mr-2"
                                        />
                                        Online Payment ( Free Shipping )
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === "cod"}
                                            onChange={handlePaymentMethodChange}
                                            className="mr-2"
                                        />
                                        Cash on Delivery (&#8377; 99 Extra Charges Apply)
                                    </label>
                                </div>
                            </div>

                            {paymentMethod === "razorpay" ? (
                                <RazorpayPayment
                                    amount={productData.price}
                                    productName={productData.name}
                                    userDetails={userDetails}
                                    size={productData.size}
                                    onConfirm={handleConfirmShipment}
                                />
                            ) : paymentMethod === "cod" ? (
                                <button
                                    className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-700 transition-colors"
                                    onClick={handleConfirmShipment}
                                >
                                    Confirm Shipment
                                </button>
                            ) : null}
                        </div>
                    )}
                </div>

                {/* Popup Confirmation */}
                {orderConfirmed && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-md shadow-lg ">
                            <h2 className="text-xl font-semibold text-center text-gray-800">
                                Your order has been confirmed!
                            </h2>
                            <h2 className="text-xl font-semibold text-center text-gray-800">
                                We will contact you shortly to confirm your order.
                            </h2>
                            <button
                                onClick={handleClosePopup} // Call handleClosePopup for redirection
                                className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default function CheckoutPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPage />
        </Suspense>
    );
};