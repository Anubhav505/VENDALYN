"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { gsap } from "gsap";
import bestSellerData from "@/app/data/products.json";
import Image from "next/image";

export default function BestSeller() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    gsap.to(".shopAll", {
      scale: 1.15,
      yoyo: true,
      repeat: -1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  const bestSeller = bestSellerData.bestSeller;

  return (
    <section className="mb-12 h-screen flex flex-col justify-evenly px-2">
      <h2 className="heading text-4xl font-bold mb-8 h-[10%] flex items-center justify-center">Best Seller</h2>
      <div className="embla overflow-hidden h-[90%]" ref={emblaRef}>
        <div className="embla__container h-full w-full flex">
          {bestSeller.map((product) => (
            <div key={product.id} className="embla__slide flex-none h-full w-full sm:flex justify-center gap-20 min-w-0">
              <div className="h-[70%] sm:h-full sm:w-[30rem] relative ">
                <Image className='rounded-lg' fill={true} src={product.image} alt={product.name} />
              </div>
              <div className="h-[30%] sm:h-full text-center sm:relative md:top-20">
             
                  <h3 className="font-semibold text-2xl">{product.name}</h3>
                  <h3 className="text-lg">{product.price}</h3>
                
                <h3 className="text-lg">{product.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}