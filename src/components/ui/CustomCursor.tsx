"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.innerWidth < 768 || window.matchMedia("(hover: none)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 w-9 h-9 border border-accent/40 rounded-full pointer-events-none z-[100] hidden md:block"
      animate={{
        x: mousePosition.x - 18,
        y: mousePosition.y - 18,
        scale: isHovering ? 1.45 : 1,
        borderColor: isHovering ? "rgba(201, 253, 116, 0.75)" : "rgba(201, 253, 116, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.45 }}
    />
  );
}
