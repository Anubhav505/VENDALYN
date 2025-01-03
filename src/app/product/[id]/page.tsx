'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!params?.id) {
            setError("Product ID not found");
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params?.id]);

    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
    if (!product) return <div className="text-center p-8">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[500px]">
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-lg"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <div className="text-2xl font-semibold mb-6">
                        ${product.price.toFixed(2)}
                    </div>
                    <button className="border-black border py-3 px-6 rounded-md hover:bg-black hover:text-white transition-colors">
                        ADD TO CART
                    </button>
                    <button className="mt-4 bg-black py-3 px-6 rounded-md text-white  text-bold">
                        BUY NOW
                    </button>
                </div>
            </div>
        </div>
    );
} 