"use client";
import { Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";

const Music: React.FC<{ src?: string }> = ({ src = "/music/music.mp3" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 left-5 z-[100] flex items-center gap-2">
      <button
        className="text-purple-500 border border-purple-800 rounded-full p-1"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default Music;