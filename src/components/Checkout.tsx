// "use client";

// import { Suspense, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import RazorpayPayment from "@/components/RazorpayPayment";
// import axios from "axios";
// import Image from "next/image";
// import { Truck } from "lucide-react";

// // Define a TypeScript type for user details
// interface UserDetails {
//     name: string;
//     email: string;
//     contact: string;
//     address: string;
//     pinCode: string;
// }

// function CheckoutPage() {
//     const searchParams = useSearchParams();
//     const router = useRouter();

//     const name = searchParams?.get("name");
//     const price = searchParams?.get("price");
//     const image = searchParams?.get("image");
//     const size = searchParams?.get("size");

//     const [userDetails, setUserDetails] = useState<UserDetails>({
//         name: "",
//         email: "",
//         contact: "",
//         address: "",
//         pinCode: "",
//     });

//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod" | null>(null);
//     const [orderConfirmed, setOrderConfirmed] = useState(false);

//     const productData = {
//         name: name || "Product Name",
//         price: parseFloat(price || "0"),
//         image: image || null,
//         size: size || "N/A",
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setUserDetails((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Validate if all fields are filled
//         if (
//             !userDetails.name ||
//             !userDetails.email ||
//             !userDetails.contact ||
//             !userDetails.address ||
//             !userDetails.pinCode
//         ) {
//             alert("Please fill in all fields before proceeding.");
//             return;
//         }
//         setFormSubmitted(true);
//     };

//     const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPaymentMethod(e.target.value as "razorpay" | "cod");
//     };

//     const handleConfirmShipment = async () => {
//         if (paymentMethod === "cod") {
//             const shipmentDetails = {
//                 product_name: productData.name,
//                 price: productData.price,
//                 size: productData.size,
//                 user_name: userDetails.name,
//                 user_contact: userDetails.contact,
//                 user_email: userDetails.email,
//                 address: userDetails.address,
//                 pin_code: userDetails.pinCode,
//                 payment: paymentMethod,
//             };

//             try {
//                 // Trigger the API call to save the shipment data in the database
//                 const response = await axios.post("/api/checkout", shipmentDetails);

//                 // Check if the response is successful
//                 if (response.data.success) {
//                     // Set orderConfirmed to true only when the data is saved successfully
//                     setOrderConfirmed(true);
//                 } else {
//                     alert("There was an issue confirming the shipment.");
//                 }
//             } catch (error) {
//                 console.error("Error with shipment confirmation:", error);
//                 alert("There was an error with the shipment confirmation. Please try again.");
//             }
//         }
//     };


//     const handleClosePopup = () => {
//         setOrderConfirmed(false); // Close the popup
//         router.push("/"); // Redirect to the homepage
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="w-full p-2 mb-72 mt-4">
//                 <h1 className="nav text-3xl sm:text-6xl font-bold text-center text-gray-800 mb-6">Checkout</h1>
//                 <div className="w-full flex flex-col sm:flex-row">
//                     <div className="h-[50vh] w-full sm:w-1/2 flex flex-col justify-start">
//                         <div className="relative h-1/2">
//                             <Image
//                                 src={productData.image || "/placeholder.png"}
//                                 alt={productData.name || "Product Image"}
//                                 fill={true}
//                                 className="object-contain"
//                             />
//                         </div>
//                         <div className="h-1/2 flex justify-center flex-col items-center">
//                             <h2><strong>{productData.name}</strong></h2>
//                             <p><strong>Size:&nbsp;&nbsp;</strong> {productData.size}</p>
//                             <p><strong>Price:&nbsp;&nbsp;</strong>₹{productData.price.toFixed(2)}</p>
//                         </div>
//                     </div>

//                     {!formSubmitted ? (
//                         <form className="w-full sm:w-1/2 flex flex-col justify-evenly sm:gap-0 gap-3" onSubmit={handleSubmit}>
//                             <h1 className="nav text-[5vw] sm:text-2xl text-center font-bold text-gray-800 mb-6">Please fill the details</h1>
//                             <div className="flex gap-3 sm:gap-6">
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={userDetails.name}
//                                     onChange={handleInputChange}
//                                     placeholder="Your Name"
//                                     className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
//                                     required
//                                 />
//                                 <input
//                                     type="text"
//                                     name="pinCode"
//                                     value={userDetails.pinCode}
//                                     onChange={handleInputChange}
//                                     placeholder="Pin Code"
//                                     className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
//                                     required
//                                 />
//                             </div>
//                             <div className="flex gap-3 sm:gap-6">
//                                 <input
//                                     type="tel"
//                                     name="contact"
//                                     value={userDetails.contact}
//                                     onChange={handleInputChange}
//                                     placeholder="Your Contact Number"
//                                     className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
//                                     required
//                                 />
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     value={userDetails.address}
//                                     onChange={handleInputChange}
//                                     placeholder="Your Address"
//                                     className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
//                                     required
//                                 />
//                             </div>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={userDetails.email}
//                                 onChange={handleInputChange}
//                                 placeholder="Your Email"
//                                 className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
//                                 required
//                             />
//                             <button
//                                 type="submit"
//                                 className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-700 transition-colors"
//                             >
//                                 Proceed to Payment
//                             </button>
//                         </form>
//                     ) : (
//                         <div className="mt-8">
//                             <div className="space-y-4">
//                                 <h2 className="nav text-xl font-semibold">Select Payment Method</h2>
//                                 <div className="flex flex-col gap-4">
//                                     <label className="inline-flex items-center mr-4">
//                                         <input
//                                             type="radio"
//                                             name="paymentMethod"
//                                             value="razorpay"
//                                             checked={paymentMethod === "razorpay"}
//                                             onChange={handlePaymentMethodChange}
//                                             className="mr-2"
//                                         />
//                                         Online Payment &nbsp;<span className=" p-1 rounded-xl flex gap-1">( Free Shipping <span><Truck /></span>)</span>
//                                     </label>
//                                     <label className="inline-flex items-center">
//                                         <input
//                                             type="radio"
//                                             name="paymentMethod"
//                                             value="cod"
//                                             checked={paymentMethod === "cod"}
//                                             onChange={handlePaymentMethodChange}
//                                             className="mr-2"
//                                         />
//                                         Cash on Delivery &nbsp; <span className="bg-yellow-100 p-1 rounded-xl">(&#8377;99 Shipping Charges )</span>
//                                     </label>
//                                 </div>
//                             </div>

//                             {paymentMethod === "razorpay" ? (
//                                 <RazorpayPayment
//                                     amount={productData.price}
//                                     productName={productData.name}
//                                     userDetails={userDetails}
//                                     size={productData.size}
//                                     onConfirm={handleConfirmShipment}
//                                 />
//                             ) : paymentMethod === "cod" ? (
//                                 <button
//                                     className="w-full bg-black text-white py-3 mt-3 rounded-md hover:bg-gray-700 transition-colors"
//                                     onClick={handleConfirmShipment}
//                                 >
//                                     Confirm Shipment
//                                 </button>
//                             ) : null}
//                         </div>
//                     )}
//                 </div>
//                 <h1 className="nav text-[4vw] sm:text-2xl text-center font-bold text-red-500 mt-6">We will Contact you to confirm your order that it&apos;s you</h1>

//                 {/* Popup Confirmation */}
//                 {orderConfirmed && (
//                     <div className="fixed nav text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center px-2">
//                         <div className="bg-white p-6 rounded-md shadow-lg ">
//                             <h2 className="text-xl font-semibold text-center ">
//                                 Your order has been confirmed!
//                             </h2>
//                             <h2 className="text-xl font-semibold text-center ">
//                                 We will contact you shortly to confirm that it&apos;s you.
//                             </h2>
//                             <button
//                                 onClick={handleClosePopup} // Call handleClosePopup for redirection
//                                 className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }

// export default function CheckoutPageWrapper() {
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <CheckoutPage />
//         </Suspense>
//     );
// }


"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import RazorpayPayment from "@/components/RazorpayPayment";
import axios from "axios";
import Image from "next/image";

// Define a TypeScript type for user details
interface UserDetails {
    name: string;
    email: string;
    contact: string;
    address: string;
    pinCode: string;
}

function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const name = searchParams?.get("name");
    const price = searchParams?.get("price");
    const image = searchParams?.get("image");
    const size = searchParams?.get("size");

    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: "",
        email: "",
        contact: "",
        address: "",
        pinCode: "",
    });

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
        // Validate if all fields are filled
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
    };

    const handleConfirmShipment = async () => {
        const shipmentDetails = {
            product_name: productData.name,
            price: productData.price,
            size: productData.size,
            user_name: userDetails.name,
            user_contact: userDetails.contact,
            user_email: userDetails.email,
            address: userDetails.address,
            pin_code: userDetails.pinCode,
            payment: "razorpay",
        };

        try {
            // Trigger the API call to save the shipment data in the database
            const response = await axios.post("/api/checkout", shipmentDetails);

            // Check if the response is successful
            if (response.data.success) {
                // Set orderConfirmed to true only when the data is saved successfully
                setOrderConfirmed(true);
            } else {
                alert("There was an issue confirming the shipment.");
            }
        } catch (error) {
            console.error("Error with shipment confirmation:", error);
            alert("There was an error with the shipment confirmation. Please try again.");
        }
    };

    const handleClosePopup = () => {
        setOrderConfirmed(false); // Close the popup
        router.push("/"); // Redirect to the homepage
    };

    return (
        <>
            <Navbar />
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
                            <p><strong>Price:&nbsp;&nbsp;</strong>₹{productData.price.toFixed(2)}</p>
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
                        <RazorpayPayment
                            amount={productData.price}
                            productName={productData.name}
                            userDetails={userDetails}
                            size={productData.size}
                            onConfirm={handleConfirmShipment}
                        />
                    </form>
                </div>
                <h1 className="nav text-[4vw] sm:text-2xl text-center font-bold text-red-500 mt-6">We will Contact you to confirm your order that it&apos;s you</h1>

                {/* Popup Confirmation */}
                {orderConfirmed && (
                    <div className="fixed nav text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center px-2">
                        <div className="bg-white p-6 rounded-md shadow-lg ">
                            <h2 className="text-xl font-semibold text-center ">
                                Your order has been confirmed!
                            </h2>
                            <h2 className="text-xl font-semibold text-center ">
                                We will contact you shortly to confirm that it&apos;s you.
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
}
