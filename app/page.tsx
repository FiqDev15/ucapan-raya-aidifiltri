"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wish } from "@/lib/supabase";
import WishForm from "@/components/WishForm";
import WishesDisplay from "@/components/WishesDisplay";
import FloatingKetupat from "@/components/FloatingKetupat";
import BackgroundMusic from "@/components/BackgroundMusic";
import StarField from "@/components/StarField";

// Islamic geometric ornament
function IslamicOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#D4AF37" strokeWidth="1" opacity="0.4">
        <polygon points="60,10 110,35 110,85 60,110 10,85 10,35" fill="none" strokeWidth="1.5" />
        <polygon points="60,22 98,42 98,78 60,98 22,78 22,42" fill="none" />
        <polygon points="60,34 86,49 86,71 60,86 34,71 34,49" fill="none" />
        <circle cx="60" cy="60" r="15" fill="none" />
        <circle cx="60" cy="60" r="8" fill="#D4AF37" fillOpacity="0.15" />
        <line x1="60" y1="10" x2="60" y2="110" strokeDasharray="3 4" />
        <line x1="10" y1="60" x2="110" y2="60" strokeDasharray="3 4" />
        <line x1="17" y1="25" x2="103" y2="95" strokeDasharray="2 4" />
        <line x1="103" y1="25" x2="17" y2="95" strokeDasharray="2 4" />
      </g>
    </svg>
  );
}

export default function HomePage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      if (data.wishes) setWishes(data.wishes);
    } catch (err) {
      console.error("Failed to fetch wishes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const handleWishAdded = (newWish: Wish) => {
    setWishes((prev) => [newWish, ...prev]);
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #052e16 0%, #14532d 30%, #166534 60%, #15803d 80%, #052e16 100%)",
      }}
    >
      {/* Islamic pattern overlay */}
      <div className="islamic-pattern fixed inset-0 z-0 pointer-events-none" />

      {/* Star field */}
      <StarField />

      {/* Floating ketupat */}
      <FloatingKetupat />

      {/* Background music (auto-play) */}
      <BackgroundMusic />

      {/* ── Decorative elements ── */}
      {/* Islamic ornaments */}
      <div className="fixed bottom-8 left-8 w-20 h-20 z-5 opacity-20 hidden lg:block">
        <IslamicOrnament />
      </div>
      <div className="fixed bottom-8 right-8 w-20 h-20 z-5 opacity-20 hidden lg:block">
        <IslamicOrnament />
      </div>

      {/* ── Main content ── */}
      <main className="relative z-20 flex flex-col items-center px-4 py-10 pb-20 min-h-screen">

        {/* ─── Hero Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-10 mt-20"
        >
          {/* Main title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gold-shimmer title-glow leading-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Selamat Hari Raya
            <br />
            <span className="text-green-300">Aidilfitri</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-green-300 text-base md:text-lg opacity-80 mt-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Maaf Zahir dan Batin
          </motion.p>

          {/* Bottom divider */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px bg-gradient-to-r from-transparent to-yellow-500 w-24 opacity-40" />
            <span className="text-yellow-500 text-sm opacity-60">
              1 Syawal 1447H
            </span>
            <div className="h-px bg-gradient-to-l from-transparent to-yellow-500 w-24 opacity-40" />
          </div>
        </motion.div>

        {/* ── Wish Form ── */}
        <div className="w-full max-w-lg mx-auto">
          <WishForm onWishAdded={handleWishAdded} />
        </div>

        {/* ── Section divider ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center gap-3 my-10 w-full max-w-md"
        >
          <div
            className="flex-1 h-px opacity-30"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }}
          />
          <span className="text-yellow-400 opacity-60 text-sm px-2">
            ✦ Ucapan Raya ✦
          </span>
          <div
            className="flex-1 h-px opacity-30"
            style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }}
          />
        </motion.div>

        {/* ── Wishes Display ── */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 py-10"
          >
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-yellow-400"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <p className="text-green-400 text-sm opacity-60">
              Memuatkan ucapan...
            </p>
          </motion.div>
        ) : (
          <WishesDisplay wishes={wishes} />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-20 text-center py-6 pb-4">
        <p className="text-green-200 text-base font-medium opacity-80 mb-2">
          Selamat Hari Raya Aidilfitri
        </p>
        <p className="text-green-300 text-sm opacity-70">
          Maaf Zahir &amp; Batin · Ikhlas dari Zakiyah Razak
        </p>
      </footer>
    </div>
  );
}
