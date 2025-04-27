"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import SizeChart from "@/components/SizeChart";
import { Truck } from "lucide-react";

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

interface CartItem {
    id: string;
    size: string;
    quantity: number;
    name: string;
    price: number;
    image: string;
}

export default function ProductPage() {
    const { id: productId } = useParams<{ id: string }>() || {};
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>("S");
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!productId) return;
        fetch(`/api/products/${productId}`)
            .then((res) => res.json())
            .then(setProduct)
            .catch((err) => console.error("Error fetching product:", err));
    }, [productId]);

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    // Modified BUY NOW sends to cart checkout with product details via query parameters
    const handleBuyNow = () => {
        if (!product) return;

        const queryParams = new URLSearchParams({
            id: product._id,
            size: selectedSize,
            quantity: quantity.toString(),
            name: product.name,
            price: product.price.toString(),
            image: product.image_1,
            flow: "direct", // flag to denote direct-buy flow
        });

        router.push(`/cartCheckout?${queryParams.toString()}`);
    };

    const handleAddToCart = () => {
        if (!product) return;

        const newItem: CartItem = {
            id: product._id,
            size: selectedSize,
            quantity,
            name: product.name,
            price: product.price,
            image: product.image_1,
        };

        const existingCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingIndex = existingCart.findIndex(
            (item: CartItem) => item.id === newItem.id && item.size === newItem.size
        );

        if (existingIndex !== -1) {
            existingCart[existingIndex].quantity += quantity;
        } else {
            existingCart.push(newItem);
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
        window.dispatchEvent(new Event("cart-updated"));
        window.dispatchEvent(new Event("storage"));
    };

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

    return (
        <>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 my-12 p-6 md:p-8">
                <div className="flex gap-2">
                    <div className="flex flex-col gap-2 mt-4">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg cursor-pointer border-b border overflow-hidden"
                                onClick={() => setSelectedImage(index)}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} - ${index + 1}`}
                                    fill
                                    objectFit="cover"
                                    className="hover:opacity-80 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="relative w-full aspect-square overflow-hidden rounded-lg cursor-pointer">
                        <Image
                            src={images[selectedImage]}
                            alt={product.name}
                            fill
                            objectFit="cover"
                            priority
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-2xl md:text-4xl">{product.name}</h1>
                    <div className="text-2xl md:text-3xl text-primary my-2 flex justify-between sm:justify-start space-x-2">
                        <div className="space-x-2">
                            <span className="text-lg font-semibold md:text-xl">
                                ₹{product.price.toFixed(2)}
                            </span>
                            <span className="text-base md:text-lg text-gray-500 line-through">
                                ₹{product.oprice}
                            </span>
                        </div>
                        <div className="flex items-center text-sm px-1 rounded-md bg-green-100">
                            Free Delivery &nbsp;
                            <Truck />
                        </div>
                    </div>
                    <h1 className="text-sm rounded-md bg-gray-100 w-fit px-1 mb-2 text-red-500">
                        Hurry Up! only few left
                    </h1>
                    <div className="flex text-base justify-between">
                        <div>Size :</div>
                        <div
                            className="underline cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Size Chart
                        </div>
                    </div>
                    <div className="flex gap-4 my-4">
                        {["S", "M", "L", "XL", "2XL"].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 border rounded-md ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 my-3">
                        <span className="text-lg">Quantity:</span>
                        <div className="flex items-center border rounded-md">
                            <button onClick={handleDecrement} className="px-4 py-2 border-r hover:bg-gray-100">
                                -
                            </button>
                            <span className="px-4 py-2">{quantity}</span>
                            <button onClick={handleIncrement} className="px-4 py-2 border-l hover:bg-gray-100">
                                +
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10 mt-6">
                        <button
                            onClick={handleBuyNow}
                            className="py-3 px-6 rounded-md text-white w-full bg-black hover:bg-gray-600 transition-colors duration-300 ease-in-out"
                        >
                            BUY NOW
                        </button>

                        <button
                            onClick={handleAddToCart}
                            className="py-3 px-6 rounded-md text-white w-full bg-black hover:bg-gray-600 transition-colors duration-300 ease-in-out"
                        >
                            ADD TO CART
                        </button>
                    </div>

                    <ul className="list-disc marker:text-xs pl-5">
                        {[product.d_1, product.d_2, product.d_3, product.d_4, product.d_5, product.d_6]
                            .filter(Boolean)
                            .map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                    </ul>
                </div>
            </div>

            {isModalOpen && <SizeChart onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
