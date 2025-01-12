'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';
import Image from 'next/image';
import Payment from '@/components/Payment';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image_1: string;
    image_2: string;
    image_3: string;
    features?: string[];
}

export default function ProductPage() {
    const { id: productId } = useParams() || {};
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then((res) => res.json())
            .then(setProduct)
            .catch((err) => console.error('Error fetching product:', err));
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    const images = [product.image_1, product.image_2, product.image_3].filter(Boolean);

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Media Gallery */}
                <div>
                    <div
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
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

                {/* Product Info */}
                <div className="flex flex-col">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
                        <div className="text-2xl md:text-3xl text-primary mt-2">
                            <p className="text-xl md:text-2xl text-gray-500 line-through">₹2599</p>
                            <p>₹{product.price.toFixed(2)}</p>
                        </div>
                        <p className="mt-4 text-gray-700">{product.description}</p>
                        {product.features && (
                            <ul className="mt-6 space-y-2">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="mt-6">
                        <Payment
                            amount={product.price * 100}
                            customerName="John Doe"
                            customerEmail="john.doe@example.com"
                            customerContact="9876543210"
                        />
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl">
                        <button
                            className="absolute top-4 right-4 text-white"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="h-6 w-6 bg-black rounded-lg" />
                        </button>
                        <Image
                            src={images[selectedImage]}
                            alt={product.name}
                            width={800}
                            height={800}
                            className="object-contain"
                        />
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${selectedImage === index ? 'bg-white' : 'bg-gray-500'
                                        }`}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
