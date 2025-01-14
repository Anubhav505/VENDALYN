import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full"> 
      <div className="size-80 sm:h-[96vh] w-full relative overflow-hidden">
        <Image alt="hero image" fill={true} src='/hero.jpg' className="absolute top-0 left-0 h-full w-full object-cover object-right-bottom" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="absolute top-0 flex flex-col items-center justify-between py-3 h-full w-full hero">
        <h1 className="nav text-[7vw] text-white">VENDALYN</h1>
        <h1 className="nav text-[2.5vw] text-white">BEYOND THE GLOOM</h1>
      </div>
    </div>
  );
}
