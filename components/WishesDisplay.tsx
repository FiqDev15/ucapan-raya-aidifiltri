"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wish } from "@/lib/supabase";
import WishBubble from "@/components/WishBubble";
import { useEffect, useState } from "react";

interface WishesDisplayProps {
  wishes: Wish[];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function WishesDisplay({ wishes }: WishesDisplayProps) {
  const isMobile = useIsMobile();

  if (wishes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 px-6"
      >
        <p className="text-green-200 text-lg opacity-90 font-medium">
          Belum ada ucapan lagi.
        </p>
        <p className="text-green-300 text-sm mt-1 opacity-70">
          Jadilah yang pertama!
        </p>
      </motion.div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full px-4 py-6 space-y-3">
        <AnimatePresence>
          {wishes.map((wish, index) => (
            <WishBubble
              key={wish.id}
              wish={wish}
              index={index}
              isMobile={true}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop: split into left and right columns
  const leftWishes = wishes.filter((_, i) => i % 2 === 0);
  const rightWishes = wishes.filter((_, i) => i % 2 === 1);

  return (
    <div
      className="w-full relative"
      style={{ minHeight: "200px" }}
    >
      {/* Left column */}
      <div
        className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-5 items-start"
        style={{
          maxWidth: "280px",
          maxHeight: "80vh",
          overflowY: "auto",
          overflowX: "visible",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          zIndex: 10,
          paddingRight: "8px",
        }}
      >
        <AnimatePresence>
          {leftWishes.map((wish, i) => (
            <WishBubble
              key={wish.id}
              wish={wish}
              index={i * 2}
              isMobile={false}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Right column */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-5 items-end"
        style={{
          maxWidth: "280px",
          maxHeight: "80vh",
          overflowY: "auto",
          overflowX: "visible",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          zIndex: 10,
          paddingLeft: "8px",
        }}
      >
        <AnimatePresence>
          {rightWishes.map((wish, i) => (
            <WishBubble
              key={wish.id}
              wish={wish}
              index={i * 2 + 1}
              isMobile={false}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
