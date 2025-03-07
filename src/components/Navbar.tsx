"use client";
import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import NavIcon from "./NavIcon";

const Navbar = () => {
  const collectionRef = useRef<HTMLDivElement | null>(null);
  const navCollectionRef = useRef<HTMLDivElement | null>(null);
  const menuOptionsRef = useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const collectionEl = collectionRef.current;
    const navCollectionEl = navCollectionRef.current;
    if (!collectionEl || !navCollectionEl) return;

    const animation = gsap.to(navCollectionEl, {
      height: "40vh",
      duration: 0.3,
      paused: true,
    });

    const handleMouseEnter = () => animation.play();
    const handleMouseLeave = () => {
      setTimeout(() => {
        if (![collectionEl, navCollectionEl].some((el) => el.matches(":hover"))) {
          animation.reverse();
        }
      }, 50);
    };

    collectionEl.addEventListener("mouseenter", handleMouseEnter);
    collectionEl.addEventListener("mouseleave", handleMouseLeave);
    navCollectionEl.addEventListener("mouseenter", handleMouseEnter);
    navCollectionEl.addEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseClick = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuOptionsRef.current, {
        height: "40vh",
        duration: 0.3,
      });
    } else {
      gsap.to(menuOptionsRef.current, {
        height: "0vh",
        duration: 0.3,
      });
    }
  }, [isMenuOpen]);

  return (
    <div className="sticky top-0 z-50">


      <div className="h-[6vh] flex justify-between items-center text-sm font-normal px-4 md:px-10 bg-black text-white">
        
        <div
          ref={menuOptionsRef}
          className="cursor-pointer sm:hidden"
          onClick={handleMenuClick}
        >
          <Menu size={30} strokeWidth={1} />
        </div>
        
        <div>
          <Link href={"/"} className="nav tracking-[0.1rem]">
            VENDALYN
          </Link>
        </div>
        
        <div className="hidden sm:block">
          <div className="navoptions flex gap-2" >
            <Link href={"/"} onClick={handleLinkClick}>
              <span className="group relative overflow-hidden">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </Link>
            <div className="collection" ref={collectionRef}>
              <span className="group relative overflow-hidden">
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </div>
            <Link href={"/about"} onClick={handleLinkClick}>
              <span className="group relative overflow-hidden">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href={"/contact"} onClick={handleLinkClick}>
              <span className="group relative overflow-hidden">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </Link>
          </div>
        </div>
        
        <NavIcon />
        
      
      </div>



      <div
        className="absolute navCollection top-[6vh] h-[0vh] w-full bg-black overflow-hidden flex"
        ref={navCollectionRef}
      >
        <div className=" w-1/2 flex justify-center gap-8 h-full">
          <img
            src="https://res.cloudinary.com/daexpmksd/image/upload/v1738236499/21_uhvqo2.png"
            className="object-contain"
          />
          <div className=" flex justify-center items-center text-white">
            <Link href={"/genz-collection"} className="flex gap-2">
              GENX COLLECTION <ChevronRight />
            </Link>
          </div>
        </div>
        <div className=" w-1/2 flex justify-center gap-8 h-full">
          <img
            src="https://res.cloudinary.com/daexpmksd/image/upload/v1738850655/1_fr4bdj.png"
            className="object-contain"
          />
          <div className=" flex justify-center items-center text-white">
            <Link href={"/haryanvi-collection"} className="flex gap-2">
              LAL रंग COLLECTION <ChevronRight />
            </Link>
          </div>
        </div>
      </div>
      <div
        ref={menuOptionsRef}
        className="menuOptions bg-black text-white h-0 w-full absolute top-0 overflow-hidden transition-all duration-300 flex flex-col items-start justify-center px-2 leading-snug"
      >
        <Link href={"/"} onClick={handleLinkClick} className="text-[9vw] font-extralight">Home</Link>
        <Link href={"/genz-collection"} onClick={handleLinkClick} className="text-[9vw] font-extralight">Genx Collection</Link>
        <Link href={"/haryanvi-collection"} onClick={handleLinkClick} className="text-[9vw] font-extralight"><span className="text-red-500">LaL </span>रंग Collection</Link>
        <div
          className=" absolute top-3 left-4 sm:right-10 cursor-pointer"
          onClick={handleCloseClick}
        >
          <X size={30} strokeWidth={1}/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
