"use client";
import { useEffect } from "react";
import React from 'react'
const Hero = () => {
  useEffect(() => {
    // Dynamically import the model-viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.jsdelivr.net/npm/@google/model-viewer@latest";
    document.head.appendChild(script);

    // Cleanup when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full h-[60vh] sm:h-screen bg-black flex">
      <div className="hidden sm:block h-full sm:w-[32.5%]"></div>
      <div className="h-full w-full sm:w-[35%] flex items-center justify-center overflow-hidden">
        <model-viewer
          className=" h-full w-full"
          src="/dragon_glass.glb"
          alt="3D Model of Dragon Glass"
          auto-rotate
          camera-controls
          autoplay
        ></model-viewer>
      </div>
      <div className="hidden sm:block h-full sm:w-[32.5%]"></div>
      <h1 className="nav text-[7vw] absolute top-3 w-full text-white text-center">
        VENDALYN
      </h1>

      <h1 className="nav text-[2.5vw] absolute bottom-3 w-full text-white text-center">
        IN THE 7<sup>th</sup> HEAVEN
      </h1>
    </div>
  );
}

export default Hero