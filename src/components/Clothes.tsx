"use client";
import clothesData from "@/app/data/products.json";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

const Clothes = () => {
  const router = useRouter();
  const clothes = clothesData.clothes;

  const handleProductClick = (product: Product) => {
    router.push(`/product?id=${product.id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 px-2">
        {clothes.map((product) => (
          <div key={product.id} onClick={() => handleProductClick(product)} className="product shadow-md rounded-md overflow-hidden">
            <div className="relative h-52 md:h-[30vw] rounded-md">
              <Image src={product.image} layout="fill" objectFit="cover" alt="Product Image" />
            </div>
            <div className="p-3 flex justify-between items-center">
              <div className="text-base font-semibold">{product.name}</div>
              <div className="text-sm">{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clothes;
