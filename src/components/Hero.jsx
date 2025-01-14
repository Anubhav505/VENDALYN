"use client";

import ThreeD from "./ThreeD"; // Import the ThreeD component

export default function Hero() {
  return (
    <div className="relative h-[45vh] sm:h-screen">
      <div
        id="three-container"
        className="h-[45vh] sm:h-screen w-full overflow-hidden"
        style={{
          position: "relative",
        }}
      >
        <ThreeD />
      </div>
      <div className="h-full w-full absolute top-0 flex flex-col items-center justify-between py-3">
        <h1 className="nav text-[7vw] text-white">VENDALYN</h1>
        <h1 className="nav text-[2.5vw] text-white">BEYOND THE GLOOM</h1>
      </div>
    </div>
  );
}
