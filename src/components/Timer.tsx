"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function Timer() {
    const getMidnightTimestamp = () => {
        const now = new Date();
        now.setHours(24, 0, 0, 0); // Set time to next midnight
        return now.getTime();
    };

    const [endTime, setEndTime] = useState(getMidnightTimestamp);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setTimeLeft(endTime - Date.now());

        const interval = setInterval(() => {
            const now = Date.now();
            if (now >= endTime) {
                setEndTime(getMidnightTimestamp()); // Reset at midnight
            }
            setTimeLeft(Math.max(0, endTime - now));
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    if (!isVisible || timeLeft === null) return null;

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div className="fixed bottom-0 w-full z-50 bg-[#000000] text-white  font-bold px-4 py-3 flex justify-between items-center">
            <div className="flex items-baseline gap-2 md:gap-2">
                <span className="text-sm">HOLI OFFER ENDS IN</span>
                <span className="text-green-500 text-xl">{hours}h {minutes}m {seconds}s</span>
            </div>
            <X
                className="cursor-pointer hover:text-gray-400 transition duration-200"
                onClick={() => setIsVisible(false)}
            />
        </div>
    );
}
