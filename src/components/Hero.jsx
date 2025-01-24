"use client";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="sticky top-0 w-full h-[40vh] sm:h-screen flex justify-between md:items-center -z-50">
      <div className='relative w-[34%] md:hidden'>
        <Image
          src="/heroLeft.png"
          fill={true}
          alt="heroImage"
          className="object-contain"
        />
      </div>
      <div className='relative w-[32%] md:w-full md:h-[65%]'>
        <Image
          src="/heroMid.png"
          fill={true}
          alt="heroImage"
          className="object-contain"
        />
      </div>
      <div className='relative w-[34%] md:hidden'>
        <Image
          src="/heroRight.png"
          fill={true}
          alt="heroImage"
          className="object-contain"
        />
      </div>
      <h1 className="nav text-[7vw] absolute top-3 w-full text-center">
        VENDALYN
      </h1>

      <h1 className="nav text-[2.5vw] absolute top-[80%] w-full text-center">
        IN THE 7<sup>th</sup> HEAVEN
      </h1>
    </div>
  );
}

export default Hero