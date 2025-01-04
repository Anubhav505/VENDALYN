'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export default function ProductPage() {
    const params = useParams();
    const productId = params?.id as string;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then(res => res.json().then(setProduct));
    }, [productId]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[500px]">
                    {product?.image && (
                        <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-lg" priority />
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
                    <p className="text-gray-600 mb-6">{product?.description}</p>
                    <div className="text-2xl font-semibold mb-6">₹{product?.price.toFixed(2)}</div>
                    <button className="border-black border py-3 px-6 rounded-md hover:bg-black hover:text-white transition-colors">ADD TO CART</button>
                    <button className="mt-4 bg-black py-3 px-6 rounded-md text-white font-bold" disabled>BUY NOW</button>
                </div>
            </div>
        </div>
    );
}