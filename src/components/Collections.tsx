"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import bestSellerData from "@/app/data/products.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect } from "react";

export default function BestSeller() {
  useEffect(() => {
    gsap.to(".shop", {
      scale: 1.15,
      yoyo: true,
      repeat: -1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  const router = useRouter();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const bestSeller = bestSellerData.bestSeller;

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  return (
    <div className="embla overflow-hidden text-white my-1" ref={emblaRef}>
      <div className="embla__container flex">
        {bestSeller.map((product) => (
          <div
            key={product.id}
            className="embla__slide relative flex-none w-full h-[50vh] sm:h-[70vh] sm:gap-16 items-center justify-center cursor-pointer"
            onClick={() => handleCategoryClick(product.category)}>

            <div className=" w-full flex-col h-full">
              <div className="h-[80%] relative">
              <Image
                className="rounded-lg object-contain"
                fill={true}
                src={product.image}
                alt={product.name}
              />
              </div>
              <div className=" h-[20%] w-full px-2 pt-1">
                <div className="bg-black rounded-sm h-full w-full flex flex-col justify-evenly items-center">
                  <p className="  font-semibold text-xl sm:text-3xl">{product.name}</p>
                  <Link href={`/${product.category}`} className="shop uppercase rounded-sm text-xs bg-white hover:bg-black font-semibold py-1 px-2 text-black hover:text-white hover:border hover:border-white">Shop now</Link>
                </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}