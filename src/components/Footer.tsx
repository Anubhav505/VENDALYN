"use client";
import Link from "next/link";
import Whatsapp from "./Whatsapp";

const Footer = () => {

  return (
    <footer className="border-t flex flex-col text-center text-[9px] text-white sm:h-screen bg-black">
      <div className="footerBrand sm:h-[25%] flex justify-center overflow-hidden border-b">
        <h1 className="text-[13.5vw] nav translate-y-8 sm:-translate-y-3">VENDALYN</h1>
      </div>
      <div className="flex flex-col sm:flex-row sm:h-[70%] justify-evenly font-semibold my-8 gap-8">
        <div className="flex flex-col gap-2 sm:gap-6 h-full justify-center">
          <Link href="/" className="nav font-semibold text-xs text-white">
            VENDALYN
          </Link>
          <Link href="/about">ABOUT US</Link>
          <Link href="/contactUs">CONTACT US</Link>
        </div>
        <div className="flex flex-col gap-2 sm:gap-8 h-full justify-center ">
          <h3 className="nav font-semibold text-xs text-white">QUICK LINKS</h3>
          <Link href="/terms-and-conditions">TERMS</Link>
          <Link href="/shipping-policy">SHIPPING</Link>
          <Link href="/privacy-policy">PRIVACY POLICY</Link>
          <Link href="/return-policy">EXCHANGE / RETURN POLICY</Link>
          <Link href="/return">PLACE AN EXCHANGE / RETURN REQUEST</Link>
        </div>
        <div className="flex justify-center">
          <Whatsapp />
        </div>
      </div>
      
      <div className="border-t flex items-center justify-center bg-white text-black h-[5%]">
        <p>&copy; 2025 Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
