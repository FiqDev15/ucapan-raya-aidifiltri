"use client";

import React, { useMemo } from "react";
import Image from "next/image";

const FLOATING_IMAGES = [
  "/ketupat.png",
  "/pelita.png",
  "/duitraya.png",
];

const KETUPAT_SIZES = [32, 36, 28, 40, 24, 44, 30, 38];

interface DriftingKetupatProps {
  size: number;
  imageSrc: string;
  top: string;
  animClass: string;
  delay?: string;
  opacity?: number;
}

function DriftingKetupat({
  size,
  imageSrc,
  top,
  animClass,
  delay = "0s",
  opacity = 0.6,
}: DriftingKetupatProps) {
  return (
    <div
      className={`fixed ketupat ${animClass}`}
      style={{ top, animationDelay: delay, zIndex: 1, opacity }}
    >
      <Image src={imageSrc} alt="" width={size} height={size} style={{ objectFit: "contain" }} />
    </div>
  );
}

interface FloatingKetupatDecorProps {
  size: number;
  imageSrc: string;
  top: string;
  left?: string;
  right?: string;
  animClass: string;
  opacity?: number;
}

function FloatingKetupatDecor({
  size,
  imageSrc,
  top,
  left,
  right,
  animClass,
  opacity = 0.5,
}: FloatingKetupatDecorProps) {
  const style: React.CSSProperties = {
    position: "fixed",
    top,
    zIndex: 1,
    opacity,
    ...(left ? { left } : {}),
    ...(right ? { right } : {}),
  };

  return (
    <div className={`ketupat ${animClass}`} style={style}>
      <Image src={imageSrc} alt="" width={size} height={size} style={{ objectFit: "contain" }} />
    </div>
  );
}

export default function FloatingKetupat() {
  const drifting = useMemo(
    () => [
      {
        size: 36,
        imageSrc: FLOATING_IMAGES[0],
        top: "12%",
        animClass: "drift-across-1",
        delay: "0s",
        opacity: 0.55,
      },
      {
        size: 28,
        imageSrc: FLOATING_IMAGES[1],
        top: "35%",
        animClass: "drift-across-2",
        delay: "2s",
        opacity: 0.5,
      },
      {
        size: 44,
        imageSrc: FLOATING_IMAGES[2],
        top: "62%",
        animClass: "drift-across-3",
        delay: "6s",
        opacity: 0.45,
      },
      {
        size: 32,
        imageSrc: FLOATING_IMAGES[0],
        top: "80%",
        animClass: "drift-across-4",
        delay: "10s",
        opacity: 0.5,
      },
      {
        size: 24,
        imageSrc: FLOATING_IMAGES[1],
        top: "50%",
        animClass: "drift-across-5",
        delay: "4s",
        opacity: 0.4,
      },
      {
        size: 40,
        imageSrc: FLOATING_IMAGES[2],
        top: "25%",
        animClass: "drift-across-1",
        delay: "12s",
        opacity: 0.48,
      },
      {
        size: 30,
        imageSrc: FLOATING_IMAGES[0],
        top: "45%",
        animClass: "drift-across-2",
        delay: "8s",
        opacity: 0.52,
      },
      {
        size: 35,
        imageSrc: FLOATING_IMAGES[1],
        top: "70%",
        animClass: "drift-across-3",
        delay: "14s",
        opacity: 0.46,
      },
      {
        size: 26,
        imageSrc: FLOATING_IMAGES[2],
        top: "20%",
        animClass: "drift-across-4",
        delay: "16s",
        opacity: 0.42,
      },
      {
        size: 38,
        imageSrc: FLOATING_IMAGES[0],
        top: "58%",
        animClass: "drift-across-5",
        delay: "10s",
        opacity: 0.5,
      },
    ],
    []
  );

  const fixed = useMemo(
    () => [],
    []
  );

  return (
    <>
      {/* Drifting ketupat that float across the screen */}
      {drifting.map((k, i) => (
        <DriftingKetupat key={`drift-${i}`} {...k} />
      ))}

      {/* Fixed floating ketupat around edges */}
      {fixed.map((k, i) => (
        <FloatingKetupatDecor key={`fixed-${i}`} {...k} />
      ))}
    </>
  );
}
