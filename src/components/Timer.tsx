"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function Timer() {
    const END_DATE = new Date("2025-03-16T23:59:59").getTime();
    const [timeLeft, setTimeLeft] = useState<number | null>(null); // Initially null
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Set timeLeft after component mounts to prevent hydration issues
        setTimeLeft(END_DATE - Date.now());

        const interval = setInterval(() => {
            setTimeLeft(Math.max(0, END_DATE - Date.now()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!isVisible || timeLeft === null) return null; // Prevent hydration mismatch

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div className="fixed bottom-0 w-full z-50 bg-[#1F1F1F] text-white text-sm md:text-base font-bold p-2 md:p-4 flex justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <span>HOLI OFFER ENDS IN</span>
                <span className="text-red-500">{days}d: {hours}h: {minutes}m: {seconds}s</span>
            </div>
            <X
                className="cursor-pointer hover:text-gray-400 transition duration-200"
                onClick={() => setIsVisible(false)}
            />
        </div>
    );
}
