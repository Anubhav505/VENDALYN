"use client";
import { Pause, Play } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const Music: React.FC<{ src?: string }> = ({ src = "/music/music.mp3" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false); // To track if the component is mounted
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

  // Ensure the component is mounted before rendering
  if (!mounted) {
    return null; // Avoid rendering before the component is mounted on the client
  }

  return (
    <div className="flex gap-2 items-center fixed top-4 sm:top-5 left-5 z-[100]">
      <button
        className="text-purple-500 rounded-full border-purple-800 border p-1 flex items-center justify-center"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default Music;