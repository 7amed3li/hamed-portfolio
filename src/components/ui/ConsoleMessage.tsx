"use client";
import { useEffect } from "react";

export function ConsoleMessage() {
  useEffect(() => {
    console.log(
      "%c Stop inspecting and let's work together! 🚀 \n%c Contact me at: hamed.m.abdelalim@gmail.com \n GitHub: https://github.com/7amed3li",
      "color: #c9fd74; font-size: 20px; font-weight: bold; background: #080808; padding: 10px; border: 1px solid #c9fd74;",
      "color: #888; font-size: 14px; padding: 10px;"
    );
  }, []);
  return null;
}
