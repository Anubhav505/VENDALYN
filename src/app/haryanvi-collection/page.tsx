"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
    _id: string;
    name: string;
    price: number;
    oprice: number;
    image_1: string;
    category: string;
}

const Products = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/api/products");
            const data = await response.json();
            const filtered = data.filter((product: Product) => product.category === "haryanvi-collection");
            setFilteredProducts(filtered);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const router = useRouter();
    const handleProductClick = (product: Product) => {
        router.push(`/product/${product._id}`);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-2 px-2">
            {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                ))
            ) : (
                filteredProducts.map((product) => (
                    <div key={product._id} onClick={() => handleProductClick(product)} className="product shadow-md rounded-md overflow-hidden relative">
                        <div className="relative h-52 md:h-[30vw] rounded-md">
                            <Image src={product.image_1} layout="fill" objectFit="cover" alt="Product Image" />
                        </div>
                        <div className="p-3">
                            <div className="text-base font-semibold">{product.name}</div>
                            <div className="text-sm flex justify-start gap-4">
                                <p className="text-gray-500 line-through">&#8377;{product.oprice}</p>
                                <p>&#8377;{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Products;
