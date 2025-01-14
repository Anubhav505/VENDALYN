"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
    _id: string;
    name: string;
    price: number;
    oprice: number;
    description: string;
    image_1: string;
    category: string;
}

const Combos = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);  // Keep only filteredProducts state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                // Filter products by category (Clothing in this case)
                const filtered = data.filter((product: Product) => product.category === "combo");
                setFilteredProducts(filtered);  // Set filtered products
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchProducts();
    }, []);  // Empty dependency array means this effect runs only once when the component mounts

    const router = useRouter();
    const handleProductClick = (product: Product) => {
        router.push(`/product/${product._id}`);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 px-2">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div key={product._id} onClick={() => handleProductClick(product)} className="product shadow-md rounded-md overflow-hidden relative">
                        <div className="relative h-52 md:h-[30vw] rounded-md">
                            <Image src={product.image_1} layout="fill" objectFit="cover" alt="Product Image" />
                        </div>
                        <div className="p-3">
                            <div className="text-base font-semibold">{product.name}</div>
                            <div className="text-sm flex justify-start gap-4">
                                <p className=" text-gray-500 line-through">&#8377;{product.oprice}</p>
                                <p>&#8377;{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Products Loading...</p>
            )}
        </div>
    );
};

export default Combos;
