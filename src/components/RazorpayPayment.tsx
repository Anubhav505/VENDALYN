import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

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

interface RazorpayPaymentProps {
    amount: number;
    productName: string;
    userDetails: {
        name: string;
        email: string;
        contact: string;
        address: string;
        pinCode: string;
    };
    size: string;
}

const RazorpayPayment = ({ amount, productName, userDetails, size }: RazorpayPaymentProps) => {
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false); // State for showing the confirmation popup
    const router = useRouter(); // Initialize useRouter for navigation

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => setRazorpayLoaded(true);
        script.onerror = () => console.error("Failed to load Razorpay script");
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        try {
            const response = await fetch("/api/createOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: amount * 100 }),
            });

            if (!response.ok) throw new Error("Failed to create Razorpay order");

            const order = await response.json();
            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

            if (!razorpayKey) throw new Error("Razorpay key is not defined");

            const razorpayOptions: RazorpayOptions = {
                key: razorpayKey,
                amount: order.amount,
                currency: "INR",
                name: "VENDALYN",
                description: `${productName}\nAddress: ${userDetails.address}\nPin Code: ${userDetails.pinCode}\nSize: ${size}`,
                image: "/favicon.png",
                order_id: order.id,
                handler: async (response) => {
                    const verifyResponse = await fetch("/api/verifyOrder", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            orderId: order.id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyResponse.json();
                    if (verifyData.isOk) {
                        setPaymentConfirmed(true);  // Show the confirmation popup
                    } else {
                        alert("Payment verification failed");
                    }
                },
                prefill: userDetails,
                theme: {
                    color: "#3399cc",
                },
            };

            if (razorpayLoaded) {
                const razorpay = new window.Razorpay(razorpayOptions);
                razorpay.open();
            } else {
                alert("Razorpay is not loaded. Please try again later.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Payment failed. Please try again.");
        }
    };

    const handleClosePopup = () => {
        setPaymentConfirmed(false); // Close the popup
        router.push("/"); // Redirect to the homepage
    };

    return (
        <>
            <button
                onClick={handlePayment}
                className="mt-4 bg-black py-3 px-6 rounded-md text-white w-full hover:bg-gray-600 transition-colors duration-300 ease-in-out"
            >
                Proceed to Payment
            </button>

            {/* Confirmation Popup */}
            {paymentConfirmed && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h2 className="text-xl font-semibold text-center text-gray-800">
                            Your payment has been successfully processed!
                        </h2>
                        <h2 className="text-xl font-semibold text-center text-gray-800">
                            Your order ID will be provided shortly.
                        </h2>
                        <button
                            onClick={handleClosePopup} // Close and navigate to home
                            className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RazorpayPayment;
