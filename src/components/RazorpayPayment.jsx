// components/RazorpayPayment.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RazorpayPayment = ({ amount, userDetails, productName }) => {
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => setRazorpayLoaded(true);
        script.onerror = () =>
            console.error("Failed to load Razorpay. Please restart.");
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        try {
            // Create Razorpay order
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
            if (!razorpayKey)
                throw new Error("Razorpay key is not defined in your env variables");

            const razorpayOptions = {
                key: razorpayKey,
                amount: order.amount,
                currency: "INR",
                name: "VENDALYN",
                image: "/favicon.png",
                order_id: order.id,
                handler: async (response) => {
                    // Verify the payment on the backend
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
                        // Save the order details to your database
                        const saveResponse = await fetch("/api/order", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                orderId: order.id,
                                userDetails,
                                amount: order.amount,
                                paymentId: response.razorpay_payment_id,
                                productName,
                            }),
                        });
                        const saveData = await saveResponse.json();

                        if (saveData.success) {
                            setPaymentConfirmed(true);
                        } else {
                            alert("Order saving failed. Please contact support.");
                        }
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
        setPaymentConfirmed(false);
        router.push("/");
    };

    return (
        <>
            <button
                onClick={handlePayment}
                className="mt-4 bg-black py-3 px-6 rounded-md text-white w-full hover:bg-gray-600 transition-colors duration-300 ease-in-out"
            >
                Proceed to Payment
            </button>

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
                            onClick={handleClosePopup}
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
