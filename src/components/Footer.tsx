"use client"
import Link from "next/link";
import { ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <div className="footer h-[55vh] sm:h-screen bg-black w-full flex flex-col text-white z-[51] overflow-hidden">
      <div className=" h-1/2 flex justify-between p-4 sm:p-10">

        <div className=" hidden sm:block ">

          <div className="h-full flex flex-col justify-between">
            <div>
              <h1 className="V text-white sm:text-[1.5vw] font-normal">
                Where Quality Meets Confidence.
              </h1>
            </div>

            <div>
              <a href="mailto:vendalyn.store@gmail.com">
                <span className="group relative overflow-hidden text-sm font-medium">
                  vendalyn.store@gmail.com
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
                </span>
              </a>
            </div>

            <div></div>
            <div></div>
          </div>
          
        </div>

        <div className="flex justify-between w-full sm:w-fit sm:gap-12 ">

          <div className="sm:w-1/2 flex flex-col gap-1 text-2xl sm:text-sm font-light sm:font-medium">
            <Link href={"/"}>
              <span className="group relative overflow-hidden">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href={"/about"}>
              <span className="group relative overflow-hidden">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href={"/contact"}><span className="group relative overflow-hidden">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </span></Link>
            <Link href={"/policies"}>
              <span className="group relative overflow-hidden">
                Policies
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span></Link>
            <Link href={"/return"}>
              <span className="group relative overflow-hidden">
                Exchange
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span></Link>
          </div>

          <div className="sm:w-1/2 flex flex-col items-end sm:items-start text-sm font-medium">

            <a href="https://www.instagram.com/vendalyn_/" className="overflow-hidden" target="_blank">
              <span className="group relative flex">
                Instagram <ArrowUpRight className="text-xs" />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </a>

            <a href="https://wa.me/message/V4YRKECJHD3TE1" className=" overflow-hidden " target="_blank">
              <span className="group relative flex">
                WhatsApp <ArrowUpRight className="text-xs inline-block" />
                <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </a>

            <a href="mailto:vendalyn.store@gmail.com" className="sm:hidden overflow-hidden" target="_blank">
              <span className="group relative flex">
                vendalyn.store@gmail.com
                <span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-white transition-all duration-500 group-hover:w-full"></span>
              </span>
            </a>

            <h1 className="text-sm font-medium">© 2025</h1>
          
          </div>

        </div>

      </div>
      <div className="mainbody h-1/2 flex items-end justify-center">
        <h1 className="V text-7xl sm:text-[19vw] font-semibold">VENDALYN</h1>
      </div>
    </div>
  )
}
