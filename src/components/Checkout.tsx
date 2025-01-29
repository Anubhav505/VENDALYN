"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

    const name = searchParams?.get("name");
    const price = searchParams?.get("price");
    const image = searchParams?.get("image");
    const size = searchParams?.get("size");
    const quantity = searchParams?.get("quantity");

    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: "",
        email: "",
        contact: "",
        address: "",
        pinCode: "",
    });

    const [isFormComplete, setIsFormComplete] = useState(false);

    const productData = {
        name: name || "Product Name",
        price: parseFloat(price || "0"),
        image: image || null,
        size: size || "N/A",
        quantity: parseInt(quantity || "1")
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prev) => {
            const updatedUserDetails = { ...prev, [name]: value };
            const formComplete = Object.values(updatedUserDetails).every((val) => val.trim() !== "");
            setIsFormComplete(formComplete);
            return updatedUserDetails;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormComplete) {
            alert("Please fill in all fields before proceeding.");
            return;
        }
    };

    const totalAmount = productData.price * productData.quantity;

    return (
        <div className="w-full p-2 mb-72 mt-4">
            <h1 className="nav text-3xl sm:text-6xl font-bold text-center text-gray-800 mb-6">Checkout</h1>
            <div className="w-full flex flex-col sm:flex-row">
                <div className="h-[50vh] w-full sm:w-1/2 flex flex-col justify-start">
                    <div className="relative h-1/2">
                        <Image
                            src={productData.image || "/placeholder.png"}
                            alt={productData.name || "Product Image"}
                            fill={true}
                            className="object-contain"
                        />
                    </div>
                    <div className="h-1/2 flex justify-center flex-col items-center">
                        <h2><strong>{productData.name}</strong></h2>
                        <p><strong>Size:&nbsp;&nbsp;</strong> {productData.size}</p>
                        <p><strong>Quantity:&nbsp;&nbsp;</strong> {productData.quantity}</p>
                        <p><strong>Price:&nbsp;&nbsp;</strong>₹{productData.price * productData.quantity}</p>
                    </div>
                </div>

                <form className="w-full sm:w-1/2 flex flex-col justify-evenly sm:gap-0 gap-3" onSubmit={handleSubmit}>
                    <h1 className="nav text-[5vw] sm:text-2xl text-center font-bold text-gray-800 mb-6">Please fill the details</h1>
                    <div className="flex gap-3 sm:gap-6">
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
                            type="text"
                            name="pinCode"
                            value={userDetails.pinCode}
                            onChange={handleInputChange}
                            placeholder="Pin Code"
                            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex gap-3 sm:gap-6">
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
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                    />
                    
                    {isFormComplete && (
                        <RazorpayPayment
                            amount={totalAmount}
                            productName={productData.name}
                            userDetails={userDetails}
                            size={productData.size}
                        />
                    )}
                </form>
            </div>
            <h1 className="nav text-[4vw] sm:text-2xl text-center font-bold text-red-500 mt-6">We will Contact you to confirm your order that it's you</h1>
        </div>
    );
}

export default function CheckoutPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPage />
        </Suspense>
    );
}
