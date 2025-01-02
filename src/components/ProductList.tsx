// src/components/ProductList.tsx
"use client"
import { useEffect, useState } from "react";

const ProductsList = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error:", error);
                setError("Failed to fetch products");
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if any */}
            <div>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductsList;
