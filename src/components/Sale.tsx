"use client";
import { Pause, Play } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const Music: React.FC<{ src?: string }> = ({ src = "/music/music.mp3" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false); // To track if the component is mounted
  const [isHovered, setIsHovered] = useState(false); // To track hover state
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true); // Set to true once the component is mounted on the client
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(event.target.value);
    }
  };

  if (!mounted) {
    return null; // Avoid rendering before the component is mounted on the client
  }

  return (
    <div
      className="flex  gap-2 fixed top-4 sm:top-5 left-5 z-[100]"
      onMouseEnter={() => setIsHovered(true)} // When mouse enters the area
      onMouseLeave={() => setIsHovered(false)} // When mouse leaves the area
    >
      <button className="text-purple-500 rounded-full border-purple-800 border p-1 flex items-center justify-center" onClick={togglePlay}>
        {isPlaying ? <Pause /> : <Play />}
      </button>

      {/* Volume Slider, shown only when hovered */}
      <div
        className={`flex items-center  h-full border-black mt-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: isHovered ? "0.3s" : "0s" }}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="1"
          className="w-32 volume-slider"
          onChange={handleVolumeChange}
        />
      </div>

      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default Music;
