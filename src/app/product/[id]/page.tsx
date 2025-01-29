"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
    _id: string;
    name: string;
    d_1: string;
    d_2: string;
    d_3: string;
    d_4: string;
    d_5: string;
    d_6: string;
    price: number;
    oprice: number;
    image_1: string;
    image_2: string;
    image_3: string;
}

export default function ProductPage() {
    const { id: productId } = useParams() || {};
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>("S"); // Default to "S"

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then((res) => res.json())
            .then(setProduct)
            .catch((err) => console.error("Error fetching product:", err));
    }, [productId]);

    if (!product)
        return (
            <div className="flex flex-col space-y-6">
                <Skeleton className="h-[40vh] w-full rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-[90%]" />
                    <Skeleton className="h-6 w-[80%]" />
                    <Skeleton className="h-6 w-[80%]" />
                    <Skeleton className="h-10 w-[60%]" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        );

    const images = [product.image_1, product.image_2, product.image_3].filter(Boolean);

    const handleBuyNow = () => {
        if (!selectedSize) {
            alert("Please select a size before proceeding.");
        } else {
            const queryParams = new URLSearchParams({
                id: product._id,
                size: selectedSize,
                name: product.name,
                price: product.price.toString(),
                image: product.image_1,
            });

            router.push(`/checkout?${queryParams.toString()}`);
        }
    };

    return (
        <>
          
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 my-12 p-6 md:p-8">
                    <div>
                        <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer">
                            <Image
                                src={images[selectedImage]}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="hover:scale-105 transition-transform duration-300"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg cursor-pointer"
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} - ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="hover:opacity-80 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-4xl">{product.name}</h1>
                        <div className="text-2xl md:text-3xl text-primary mt-2 flex gap-2">
                            <span className="text-base md:text-xl text-gray-500 line-through">₹{product.oprice}</span>
                            <span className="text-lg md:text-xl">₹{product.price.toFixed(2)}</span>
                        </div>

                        
                            <div className="flex text-base mb-4 justify-between mt-6">
                                <div>Size :</div>
                                <div
                                    className="underline cursor-pointer"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Size Chart
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {["S", "M", "L", "XL", "2XL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded-md ${
                                            selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                          
                     

                        <div className="mt-6">
                            <button
                                onClick={handleBuyNow}
                                className={`my-4 py-3 px-6 rounded-md text-white w-full ${
                                    !selectedSize ? "bg-gray-400" : "bg-black"
                                } hover:bg-gray-600 transition-colors duration-300 ease-in-out`}
                                disabled={!selectedSize}
                            >
                                BUY NOW
                            </button>
                        </div>

                        <div>
                            <ul className="list-disc pl-5">
                                {[product.d_1, product.d_2, product.d_3, product.d_4, product.d_5, product.d_6]
                                    .filter(Boolean)
                                    .map((value, index) => (
                                        <li key={index}>{value}</li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>

                
           

            {/* Size Chart Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3">
                    <div className="bg-white p-2 rounded-lg max-w-md w-full shadow-lg relative">
                        <button
                            className="text-sm nav px-2 rounded w-full flex justify-end my-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                        <table className="nav w-full border-collapse">
    <thead>
        <tr className="border-b border-gray-300">
            <th className="p-2 border-r border-gray-300 text-center">SIZE</th>
            <th className="p-2 border-r border-gray-300 text-center">CHEST (in)</th>
            <th className="p-2 text-center">LENGTH (in)</th>
    
        </tr>
    </thead>
    <tbody>
        <tr className="border-b border-gray-300">
            <td className="p-2 border-r border-gray-300 text-center">S</td>
            <td className="p-2 border-r border-gray-300 text-center">41</td>
            <td className="p-2 text-center">26</td>
       
        </tr>
        <tr className="border-b border-gray-300">
            <td className="p-2 border-r border-gray-300 text-center">M</td>
            <td className="p-2 border-r border-gray-300 text-center">43</td>
            <td className="p-2 text-center">27</td>
   
        </tr>
        <tr className="border-b border-gray-300">
            <td className="p-2 border-r border-gray-300 text-center">L</td>
            <td className="p-2 border-r border-gray-300 text-center">45</td>
            <td className="p-2 text-center">28</td>
        
        </tr>
        <tr className="border-b border-gray-300">
            <td className="p-2 border-r border-gray-300 text-center">XL</td>
            <td className="p-2 border-r border-gray-300 text-center">47</td>
            <td className="p-2 text-center">29</td>
 
        </tr>
        <tr>
            <td className="p-2 border-r border-gray-300 text-center">2XL</td>
            <td className="p-2 border-r border-gray-300 text-center">49</td>
            <td className="p-2 text-center">30</td>
       
        </tr>
    </tbody>
</table>
                        <div className="my-3 flex gap-2 flex-col text-justify">
                            <h1 className="text-lg nav">HOW TO MEASURE ?</h1>
                        <p><b className="text-lg nav">Chest</b> : Measure from the stitches below the armpits</p>
                        <p><b className="text-lg nav">Length</b> : Measure from where the shoulde seam meets the collar to the hem.</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
