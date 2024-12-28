"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { gsap } from "gsap";
import bestSellerData from "@/app/data/products.json";

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
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Best Seller</h2>
      <div className="embla overflow-hidden h-[60vh]" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {bestSeller.map((product) => (
            <div key={product.id} className="embla__slide flex-none w-full min-w-0 h-full px-2">
              <div className="h-[70%]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="h-[30%] p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
