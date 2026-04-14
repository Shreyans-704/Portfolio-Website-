"use client";

import { useEffect } from "react";

export default function TitleTyper() {
  useEffect(() => {
    const text = "Shreyans | Developer";
    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      // If we finished typing the full string
      if (index > text.length) {
        // Pause for 1.5 seconds
        timeoutId = setTimeout(() => {
          index = 0;
          document.title = "\u200B"; // invisible character to prevent default title flash, or just empty
          type();
        }, 1500);
        return;
      }

      // Update document title
      // We use a zero-width space for empty so the browser doesn't fallback to url
      document.title = index === 0 ? "\u200B" : text.slice(0, index);
      index++;

      // Schedule next character tick (80-120ms)
      const speed = Math.random() * 40 + 80;
      timeoutId = setTimeout(type, speed);
    };

    // Start typing
    timeoutId = setTimeout(type, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
