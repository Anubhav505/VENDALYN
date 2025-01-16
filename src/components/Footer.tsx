import Link from "next/link"
import Whatsapp from "./Whatsapp"

const Footer = () => {

  return (
    <footer className=" border-t flex flex-col text-center text-[9px] text-[#757575]">
      <div className="flex flex-col sm:flex-row gap-5 justify-evenly font-semibold my-8">
        <div className="flex flex-col gap-2">
          <Link href="/" className="nav font-semibold text-xs text-black">VENDALYN</Link>
          <Link href='/collections'>PRODUCTS</Link>
          <Link href="/about">ABOUT US</Link>
          <Link href="/contactUs">CONTACT US</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="nav font-semibold text-xs text-black">QUICK LINKS</h3>
          <Link href="/terms-and-conditions">TERMS</Link>
          <Link href="/shipping-policy">SHIPPING</Link>
          <Link href="/privacy-policy">PRIVACY POLICY</Link>
          <Link href="/return-policy">EXCHANGE / RETURN POLCY</Link>
          <Link href="/return">PLACE AN EXCHANGE / RETURN REQUEST</Link>
        </div>
        <div className="flex justify-center">
          <Whatsapp />
        </div>
      </div>
      <div className="border-t text-center text-sm py-4 ">
        <p>&copy; 2025 Store. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer