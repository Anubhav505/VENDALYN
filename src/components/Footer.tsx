import Link from "next/link";
import { ArrowUpRight } from "lucide-react"

export default function footer() {
  return (
    <div className="sm:h-screen bg-black w-full flex flex-col z-[51] text-white">
      <div className="h-1/2 flex flex-col gap-4 sm:flex-row p-10">
        <div className="sm:w-1/2">
          <h1 className="V text-white text-xl sm:text-3xl font-normal">Where Quality Meets Confidence.</h1>
        </div>
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:w-1/2  text-sm font-medium">
          <div className="sm:w-1/2 flex flex-col gap-1">
            <Link href={"/"}>
              <span className="group relative overflow-hidden">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href={"/about"}>
              <span className="group relative overflow-hidden">
                About
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href={"/contactUs"}><span className="group relative overflow-hidden">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </span></Link>
            <Link href={"/terms-and-conditions"}>
              <span className="group relative overflow-hidden">
                Terms
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span></Link>
            <Link href={"/shipping-policy"}>
              <span className="group relative overflow-hidden">
                Shipping
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href={"/privacy-policy"}>
              <span className="group relative overflow-hidden">
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span></Link>
            <Link href={"/return-policy"}>
              <span className="group relative overflow-hidden">
                Return Policy
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span></Link>
            <Link href={"/return"}>
              <span className="group relative overflow-hidden">
                Place Exchange/ Return Request
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span></Link>
          </div>
          <div className="sm:w-1/2 flex flex-col">
            <a href="https://www.instagram.com/vendalyn_/" className="overflow-hidden " target="_blank">
              <span className="group relative">
                Instagram <ArrowUpRight className="text-xs inline-block" />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span> </a>
            <a href="https://wa.me/message/V4YRKECJHD3TE1" className=" overflow-hidden " target="_blank">
              <span className="group relative">
                WhatsApp <ArrowUpRight className="text-xs inline-block" />
                <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span> </a>
            <h1 className="text-sm font-medium">© 2025</h1>
          </div>
        </div>
      </div>
      <div className="h-1/2  flex items-center justify-center">
        <h1 className="V text-[13vw] font-normal">VENDALYN</h1>
      </div>
    </div>
  )
}
