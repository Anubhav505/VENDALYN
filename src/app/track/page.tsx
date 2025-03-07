"use client";
import React, { useState, ChangeEvent } from "react";

interface TrackingInfo {
    awbNumber: string;
    status?: string;
    arrivingDate?: string;
}

const checkpoints = [
    "Processed",
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
];

export default function TrackOrder() {
    const [awb, setAwb] = useState("");
    const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchTrackingData = async (): Promise<void> => {
        setError("");
        setTrackingInfo(null);
        setIsLoading(true);

        if (!awb) {
            setError("Please enter a valid AWB number.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/track?awb=${awb}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Tracking not available");

            const shipment = data?.ShipmentData?.[0]?.Shipment;
            if (!shipment) throw new Error("No shipment data found.");

            setTrackingInfo({
                awbNumber: shipment.AWB,
                status: shipment.Status?.Status,
                arrivingDate: shipment.ExpectedDeliveryDate,
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateStr?: string | null): string => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString();
    };

    const getActiveIndex = (): number => {
        if (!trackingInfo?.status) return 0;
        const s = trackingInfo.status.toLowerCase();
        if (s.includes("delivered")) return 4;
        if (s.includes("out")) return 3;
        if (s.includes("transit")) return 2;
        if (s.includes("picked") || s.includes("pickup")) return 1;
        return 0;
    };

    const activeIndex = getActiveIndex();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl uppercase font-extrabold text-gray-900 text-center mb-8">
                    Track Your Order
                </h1>

                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Enter your AWB tracking number"
                            value={awb}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAwb(e.target.value)}
                            className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                            onKeyPress={(e) => e.key === 'Enter' && fetchTrackingData()}
                        />
                        <button
                            onClick={fetchTrackingData}
                            disabled={isLoading}
                            className={`px-8 py-4 text-lg font-semibold text-white rounded-xl transition ${isLoading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'} shadow-lg hover:shadow-blue-200`}
                        >
                            {isLoading ? 'Tracking...' : 'Track Order'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 p-4 rounded-xl mb-8 animate-fade-in">
                        <div className="flex items-center text-red-800">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{error}</span>
                        </div>
                    </div>
                )}

                {trackingInfo && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Order Details</h2>
                        <div className="relative pt-8">
                            <div className="absolute top-10 left-0 right-0 h-2 bg-gray-200 rounded-full" />
                            <div
                                className="absolute top-10 left-0 h-2 bg-blue-600 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(activeIndex / (checkpoints.length - 1)) * 100}%` }}
                            />
                            <div className="flex justify-between relative">
                                {checkpoints.map((label, index) => (
                                    <div key={index} className="flex flex-col items-center w-1/5">
                                        <div className={`mb-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${index <= activeIndex ? 'bg-blue-600 text-white scale-125 shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                                            {index <= activeIndex ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <span className="text-sm font-medium">{index + 1}</span>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <p className={`text-xs font-medium ${index <= activeIndex ? 'text-gray-900' : 'text-gray-500'}`}>{label}</p>
                                            {index === activeIndex && trackingInfo.status && (
                                                <p className="text-xs text-green-600 mt-1 animate-pulse">{trackingInfo.status}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 font-medium">AWB Number</p>
                                    <p className="text-lg font-semibold text-gray-900">{trackingInfo.awbNumber}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 font-medium">Current Status</p>
                                    <p className="text-lg font-semibold text-green-600">{trackingInfo.status || "N/A"}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 font-medium">Estimated Arrival</p>
                                    <p className="text-lg font-semibold text-gray-900">{formatDate(trackingInfo.arrivingDate)}</p>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                )}
            </div>
        </div>
    );
}