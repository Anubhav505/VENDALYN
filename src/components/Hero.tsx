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
    <div className="relative w-full h-[calc(100vh-8vh)] mb-12 ">
      <div className=" h-full w-full relative overflow-hidden">
        {/* <video className="absolute top-0 left-0 h-full w-full object-cover sm:object-[center_34%]" loop muted autoPlay src="/hero.mp4"/> */}
        <Image alt="hero image" fill={true} src='/hero.jpg' className="absolute top-0 left-0 h-full w-full object-cover object-right-bottom scale-[1.2] sm:object-[center_75%]"/>
      </div>
      <div className="px-2 heading absolute top-0 h-full w-full flex flex-col justify-center text-center">
       
          <div className=" relative -top-20 flex flex-col gap-3">
          <h1 className="text-4xl sm:text-7xl font-bold text-white">
            New Season Arrivals
          </h1>
          <Link
            href={"/collections"}
          >
            <span className=" px-4 roboto shop scale-[0.9] bg-white hover:bg-gray-500 text-black font-bold rounded-lg py-2 text-2xl">SHOP ALL</span>
          </Link>
          </div>
        
      </div>
    </div>
  );
}
