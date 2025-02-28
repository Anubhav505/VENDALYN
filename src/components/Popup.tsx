import { X, Copy } from "lucide-react";
import { useState } from "react";

export default function Popup() {
    const [isOpen, setIsOpen] = useState(true);
    const [copied, setCopied] = useState(false);

    const close = () => {
        setIsOpen(false);
    };

    const copyCode = () => {
        const code = "HOLI10";
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="bg-black bg-opacity-75 h-screen w-full flex justify-center items-center fixed top-0 z-50">
            <div className="popup relative bg-cover bg-center bg-white rounded-lg flex flex-col justify-center text-center p-6 shadow-lg"
                style={{
                    backgroundImage: 'linear-gradient(to top, rgba(255, 0, 128, 0.8) 5%, transparent 50%)',
                }}>

                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-red-500 text-lg">LIMITED OFFER!</h1>
                    <h1 className="text-5xl md:text-6xl font-semibold">
                        FLAT <span className="font-bold text-red-500">10%</span> OFF
                    </h1>
                    <h1 className="text-5xl md:text-6xl font-semibold text-black">
                        <span className="font-bold text-red-500">HOLI</span> OFFER
                    </h1>
                    <h2 className="text-sm font-medium text-gray-800">
                        Applicable to all products on purchases above ₹499
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 relative">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">USE CODE</h1>
                    <div className="flex items-center gap-2 relative">
                        <h1 onClick={copyCode} className="text-3xl md:text-4xl font-semibold bg-yellow-500 hover:bg-yellow-600
                                   border-dashed border-2 border-black rounded-md px-4 py-2 cursor-pointer">
                            HOLI10
                        </h1>

                        <button onClick={copyCode} className="ml-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                            <Copy size={24} className="text-gray-700" />
                        </button>
                        {copied && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 
                                         text-sm rounded-md transition-opacity duration-500">
                                Copied!
                            </span>
                        )}
                    </div>
                </div>

                <div className="absolute -top-10 right-0">
                    <X onClick={close} size={35} strokeWidth={1.5}
                        className="text-white hover:text-red-500 cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
