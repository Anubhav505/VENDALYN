"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchProducts();
    }, []);

    const router = useRouter();
    const handleProductClick = (product: Product) => {
        router.push(`/product/${product._id}`);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 px-2">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product._id} onClick={() => handleProductClick(product)} className="product shadow-md rounded-md overflow-hidden">
                        <div className="relative h-52 md:h-[30vw] rounded-md">
                            <Image src={product.image} layout="fill" objectFit="cover" alt="Product Image" />
                        </div>
                        <div className="p-3 flex justify-between items-center">
                            <div className="text-base font-semibold">{product.name}</div>
                            <div className="text-sm">{product.price}</div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default ProductsList;
