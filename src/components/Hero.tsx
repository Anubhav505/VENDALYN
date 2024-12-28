"use client";
import gsap from "gsap";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  useEffect(() => {
    gsap.to(".shop", {
      scale: 1,
      duration: 0.8,
      yoyo: true,
      repeat: -1,
      ease: "power2.out",
    });
  }, []);
  return (
    <div className="relative w-full h-[calc(100vh-10vh)] mb-12">
      <div className="h-full w-full">
        <Image 
        layout="fill" 
        objectFit="cover" 
        src="https://images.pexels.com/photos/7230268/pexels-photo-7230268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        alt="Hero Image" />
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-35"></div>
      </div>
      <div className="absolute top-0 h-full w-full flex flex-col justify-center items-center text-center gap-10">
        <h1 className="text-5xl sm:text-7xl font-bold text-white">
          New Season Arrivals
        </h1>
        <p className="text-2xl font-bold text-white">
          Check out our latest collection of premium products
        </p>
        <Link
          href={"/collections"}
          className="shop scale-[0.9] bg-white hover:bg-gray-500 text-black font-bold rounded-lg py-2 px-6 text-2xl "
        >
          Shop All
        </Link>
      </div>
    </div>
  );
}
