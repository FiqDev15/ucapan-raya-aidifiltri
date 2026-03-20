"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [attemptedPlay, setAttemptedPlay] = useState(false);

  useEffect(() => {
    const tryPlayAudio = async () => {
      if (audioRef.current && !attemptedPlay) {
        setAttemptedPlay(true);
        audioRef.current.volume = 0.6;
        audioRef.current.playbackRate = 1.25;

        try {
          await audioRef.current.play();
          console.log("Music playing automatically");
        } catch (error) {
          console.log("Autoplay blocked by browser. Will try on first user interaction.");

          // Try to play on any user interaction
          const playOnInteraction = async () => {
            try {
              if (audioRef.current) {
                await audioRef.current.play();
                console.log("Music started after user interaction");
                // Remove listeners after successful play
                document.removeEventListener("click", playOnInteraction);
                document.removeEventListener("touchstart", playOnInteraction);
                document.removeEventListener("keydown", playOnInteraction);
              }
            } catch (err) {
              console.log("Failed to play:", err);
            }
          };

          document.addEventListener("click", playOnInteraction, { once: true });
          document.addEventListener("touchstart", playOnInteraction, { once: true });
          document.addEventListener("keydown", playOnInteraction, { once: true });
        }
      }
    };

    // Try immediately
    tryPlayAudio();

    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [attemptedPlay]);

  return (
    <audio
      ref={audioRef}
      src="/laguraya.mp3"
      loop
      preload="auto"
      style={{ display: "none" }}
      aria-hidden="true"
    />
  );
}
