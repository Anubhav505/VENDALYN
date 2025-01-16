"use client";

import ThreeD from "./ThreeD"; // Import the ThreeD component

export default function Hero() {
  return (
    <div className="relative h-[60vh] sm:h-[96vh]">
      <div
        id="three-container"
        className="h-full sm:h-screen w-full overflow-hidden"
        style={{
          position: "relative",
        }}
      >
        <ThreeD />
      </div>
      <div className="h-full w-full absolute top-0 flex flex-col items-center justify-between py-3 text-white">
        <h1 className="nav text-[7vw]">VENDALYN</h1>
        <h1 className="nav text-[2.5vw]">BEYOND THE GLOOM</h1>
      </div>
    </div>
  );
}
