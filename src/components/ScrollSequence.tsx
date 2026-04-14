"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, useMotionValueEvent, motion } from "framer-motion";

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Total frames
  const frameCount = 100;
  
  // Create image paths
  const imagePaths = Array.from({ length: frameCount }, (_, i) => 
    `/sequence/${(i + 1).toString().padStart(3, '0')}.svg`
  );

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const preloadImages = () => {
      const images: HTMLImageElement[] = [];
      imagePaths.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setLoaded(true);
            imagesRef.current = images;
            // Render first frame immediately after loading
            renderFrame(0);
          }
        };
        images.push(img);
      });
    };
    preloadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set up Framer Motion scroll and smoothing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress to avoid jumpy frames
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // Reduced stiffness for more smoothing
    damping: 30, // Increased damping for less bounce
    restDelta: 0.001
  });

  // Map progress (0-1) to frame index (0-99)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Hook to redraw canvas frame when `frameIndex` changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded && imagesRef.current.length > 0) {
      requestAnimationFrame(() => renderFrame(Math.round(latest)));
    }
  });

  const renderFrame = (index: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

    // Handle high DPI displays for crispness
    const dpr = window.devicePixelRatio || 1;
    // Get display sizes
    const rect = canvas.getBoundingClientRect();
    
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Normalize coordinate system to use css pixels
    ctx.scale(dpr, dpr);

    // Object-fit: cover emulation
    const canvasRatio = rect.width / rect.height;
    const imgRatio = img.width / img.height;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      renderWidth = rect.width;
      renderHeight = rect.width / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - renderHeight) / 2;
    } else {
      // Canvas is taller than image
      renderWidth = rect.height * imgRatio;
      renderHeight = rect.height;
      offsetX = (rect.width - renderWidth) / 2;
      offsetY = 0;
    }

    // Clear canvas before drawing
    ctx.clearRect(0, 0, rect.width, rect.height);
    // Draw the image matching `object-fit: cover`
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  // Re-render frame on resize to keep object-fit accurate
  useEffect(() => {
    const handleResize = () => {
      if (loaded) {
        renderFrame(Math.round(frameIndex.get()));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, frameIndex]);

  // Optional: Parallax overlays using smoothProgress
  const opacity1 = useTransform(smoothProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
  const y1 = useTransform(smoothProgress, [0.1, 0.3], [50, -50]);

  const opacity2 = useTransform(smoothProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const y2 = useTransform(smoothProgress, [0.4, 0.6], [50, -50]);

  const opacity3 = useTransform(smoothProgress, [0.7, 0.8, 0.9], [0, 1, 0]);
  const y3 = useTransform(smoothProgress, [0.7, 0.9], [50, -50]);

  return (
    // Section height defines how long the user scrolls. 400vh gives ample time.
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      {/* Sticky container that remains on screen during the scroll span */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loader overlay just in case image loading is slow */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500">
            <span className="text-sm font-medium tracking-widest text-[#737373]">LOADING...</span>
          </div>
        )}

        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
        
        {/* Text Overlays - Parallax elements */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
          <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Precision & Motion
            </h2>
            <p className="text-[#a1a1aa] md:text-xl max-w-lg mx-auto">
              Engineering smooth, Awwwards-level experiences that breathe life into interfaces.
            </p>
          </motion.div>

          <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Immersive Interactivity
            </h2>
            <p className="text-[#a1a1aa] md:text-xl max-w-lg mx-auto">
              Weighing performance with aesthetics, ensuring true cinematic quality across all devices.
            </p>
          </motion.div>

          <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              The Finest Details
            </h2>
            <p className="text-[#a1a1aa] md:text-xl max-w-lg mx-auto">
              Optimized frames per second, zero drops, maximum fluidity. Scroll on.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
