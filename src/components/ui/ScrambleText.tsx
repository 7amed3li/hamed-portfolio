"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((current) =>
        current
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 8; // Slower resolution (takes 8 ticks per letter instead of 3)
    }, 40); // Slightly slower tick rate (40ms instead of 30ms)
  };

  // Removed useEffect that scrambles on mount to prevent Cumulative Layout Shift (CLS)

  return (
    <motion.span
      onMouseEnter={scramble}
      className={`inline-block ${className}`}
    >
      {displayText}
    </motion.span>
  );
}
