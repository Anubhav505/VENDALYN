"use client";
import clothesData from "@/app/data/products.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import BuyOrCart from "./BuyorCart";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

const Clothes = () => {
  const clothes = clothesData.clothes;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

  const handleCloseClick = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProduct]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 px-2">
        {clothes.map((product) => (
          <div key={product.id} className="shadow-md rounded-md overflow-hidden">
            <div className="relative h-52 md:h-[30vw] rounded-md">
              <Image src={product.image} layout="fill" objectFit="cover" alt="Product Image" />
            </div>
            <div className="p-3 flex justify-between items-center">
              <div>
                <div className="text-base font-semibold">{product.name}</div>
                <div className="text-sm">{product.price}</div>
              </div>
              <div onClick={() => handleProductClick(product)}>
                <Plus className="bg-black text-white rounded-md cursor-pointer transition-transform hover:rotate-90" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <BuyOrCart
          selectedProduct={selectedProduct}
          onClose={handleCloseClick}
        />
      )}
    </div>
  );
};

export default Clothes;
