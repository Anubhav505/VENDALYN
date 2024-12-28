import { X } from "lucide-react";
import Image from "next/image";

interface BuyOrCartProps {
    selectedProduct: {
        image: string;
        name: string;
        price: string;
        description: string;
    };
    onClose: () => void;
}

const BuyOrCart = ({ selectedProduct, onClose }: BuyOrCartProps) => {
    return (
        <div className="h-screen w-full fixed top-0 z-20 bg-black bg-opacity-60 flex items-center">
            <div className="h-1/2 w-full bg-gray-300 p-4 flex flex-col justify-evenly">
                <div className="flex justify-end" onClick={onClose}>
                    <X className="bg-black text-white w-max rounded-md" />
                </div>
                <div className="flex h-52 gap-4">
                    <div className="relative w-1/2 rounded-md overflow-hidden">
                        <Image src={selectedProduct.image} layout="fill" objectFit="cover" alt="Product Image" />
                    </div>
                    <div className="w-1/2">
                        <div className="text-base font-semibold">{selectedProduct.name}</div>
                        <div className="text-sm">{selectedProduct.price}</div>
                        <div className="text-sm">Description : {selectedProduct.description}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <button className="bg-white text-black hover:text-white hover:bg-[#1f1f1f] font-semibold py-2 rounded-md border-black border">
                        ADD TO CART
                    </button>
                    <button className="bg-black text-white font-semibold py-2 rounded-md">
                        BUY IT NOW
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyOrCart