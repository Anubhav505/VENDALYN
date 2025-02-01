"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { gsap } from "gsap";
import bestSellerData from "@/app/data/products.json";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BestSeller() {
  const router = useRouter();
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

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  return (
    <section className="flex flex-col justify-evenly px-2 my-8">
      <div className="embla overflow-hidden h-full" ref={emblaRef}>
        <div className="embla__container flex">
          {bestSeller.map((product) => (
            <div
              key={product.id}
              className="embla__slide flex-none w-full h-full flex flex-col justify-center items-center cursor-pointer"
              onClick={() => handleCategoryClick(product.category  || "")}
            >
              <p className=" text-lg font-semibold">{product.name}</p>
              <div className="relative w-72 h-96 sm:w-[30rem] sm:h-[40rem]">
                <Image
                  className="rounded-lg object-cover"
                  fill={true}
                  src={product.image}
                  alt={product.name}
                />
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
