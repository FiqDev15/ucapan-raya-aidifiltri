"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.playbackRate = 1.25; // Play 25% faster
      audioRef.current.play().catch((error) => {
        console.log("Audio autoplay failed:", error);
      });
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/laguraya.mp3"
      loop
      autoPlay
      style={{ display: "none" }}
      aria-hidden="true"
    />
  );
}
