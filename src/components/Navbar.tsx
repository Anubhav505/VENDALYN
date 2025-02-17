"use client";
import gsap from "gsap";
import Link from "next/link";
import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        gsap.to('.nav', { y: '-100%', duration: 0.6, ease: "power1" });
      }
      else if (currentScrollY < lastScrollY) {
        gsap.to('.nav', { y: '0%', duration: 0.6, ease: "power1" });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 h-[7vh] z-20 overflow-hidden">
      <div className="nav bg-white h-[7vh] w-full py-2 flex justify-between items-center px-8 md:px-10">
        <div></div>
        <div className="text-[7vw] sm:text-4xl">
          <Link href="/">VENDALYN</Link>
        </div>
        <div>
          {/* <NavIcon /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
