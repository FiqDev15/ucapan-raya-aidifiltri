"use client";

import { motion } from "framer-motion";
import { Wish } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import { ms } from "date-fns/locale";

interface WishBubbleProps {
  wish: Wish;
  index: number;
  isMobile?: boolean;
}

function timeAgo(dateString: string): string {
  try {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: ms,
    });
  } catch {
    return "";
  }
}

const BUBBLE_GRADIENTS = [
  "from-green-800 to-green-900",
  "from-emerald-800 to-green-950",
  "from-green-700 to-green-900",
  "from-teal-800 to-green-900",
  "from-green-800 to-emerald-900",
];

const FLOAT_ANIMATIONS = [
  { y: [0, -12, 0] },
  { y: [0, -8, -16, -8, 0] },
  { y: [0, -10, -5, -14, 0] },
  { y: [0, -14, -6, -10, 0] },
  { y: [0, -6, -14, -8, 0] },
];

const FLOAT_DURATIONS = [6, 8, 7, 9, 5.5];

export default function WishBubble({
  wish,
  index,
  isMobile = false,
}: WishBubbleProps) {
  const gradientClass = BUBBLE_GRADIENTS[index % BUBBLE_GRADIENTS.length];
  const floatAnim = FLOAT_ANIMATIONS[index % FLOAT_ANIMATIONS.length];
  const duration = FLOAT_DURATIONS[index % FLOAT_DURATIONS.length];
  const isLongMessage = wish.message.length > 100;
  const isShortMessage = wish.message.length < 40;

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
        className="wish-card-mobile w-full p-5"
      >
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-green-900"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F5E17A)",
              minWidth: "40px",
            }}
          >
            {wish.username.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span
                className="font-semibold text-yellow-300 text-sm truncate"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {wish.username}
              </span>
              <span className="text-xs text-green-400 opacity-60 flex-shrink-0">
                {timeAgo(wish.created_at)}
              </span>
            </div>
            <p className="text-white text-sm leading-relaxed opacity-90">
              {wish.message}
            </p>
          </div>
        </div>

        {/* Gold bottom line */}
        <div
          className="mt-3 h-px opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />
      </motion.div>
    );
  }

  // Desktop floating bubble
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: floatAnim.y,
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        scale: { duration: 0.5, delay: index * 0.1 },
        y: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        },
      }}
      className={`wish-bubble ${
        isShortMessage ? "w-52" : isLongMessage ? "w-72" : "w-64"
      } p-5`}
      style={{ position: "relative" }}
    >
      {/* Decorative top line */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        }}
      />

      {/* Username header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-green-900 flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #F5E17A)",
          }}
        >
          {wish.username.charAt(0).toUpperCase()}
        </div>
        <span
          className="font-semibold text-yellow-300 text-sm truncate"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {wish.username}
        </span>
        <span className="text-yellow-400 text-xs ml-auto opacity-60">✦</span>
      </div>

      {/* Message */}
      <p
        className="text-white text-sm leading-relaxed opacity-90 mb-3"
        style={{ wordBreak: "break-word" }}
      >
        {wish.message}
      </p>

      {/* Timestamp */}
      <p className="text-green-400 text-xs opacity-50 text-right">
        {timeAgo(wish.created_at)}
      </p>

      {/* Decorative bottom line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        }}
      />
    </motion.div>
  );
}
