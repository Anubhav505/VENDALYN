'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Payment from '@/components/Payment';

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
        
            <div className="h-[calc(100vh-10vh)] px-2">
                <div className="h-[60%] relative ">
                    {product?.image && (
                        <Image src={product.image} alt={product.name} fill={true} className=" object-contain" />
                    )}
                </div>
              
                <div className="h-[30%] flex flex-col justify-start gap-3 pt-2">
                    <h1 className="text-3xl font-bold ">{product?.name}</h1>
                    <p className="text-gray-600 ">{product?.description}</p>
                    <div className="text-2xl font-semibold ">₹{product?.price.toFixed(2)}</div>
                    {/* <button className="border-black border rounded-md hover:bg-black hover:text-white transition-colors duration-500 ease-in-out w-full py-2">ADD TO CART</button> */}
                    <div >
                        <Payment
                        amount={product?.price ? product.price * 100 : 0}
                        customerName="John Doe"
                        customerEmail="john.doe@example.com"
                        customerContact="9876543210"
                    /></div>
                        
                </div>
            </div>
     
    );
}