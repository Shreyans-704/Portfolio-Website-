"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const totalFrames = 100;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  useEffect(() => {
    // Preload all sequence images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/sequence/${paddedIndex}.svg`; 
        img.onload = () => {
            loadedCount++;
            if (loadedCount === totalFrames) {
            setImages(loadedImages);
            }
        };
        loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndex.get());
    };
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    function renderFrame(index: number) {
      if (!ctx || images.length === 0) return;
      const roundedIndex = Math.min(Math.max(Math.round(index) - 1, 0), totalFrames - 1);
      const img = images[roundedIndex];
      
      if (img && img.complete) {
        // Crop edges (5% zoom) to hide debug "FRAME XXX" artifacts
        const cropX = img.width * 0.05;
        const cropY = img.height * 0.05;
        const cropWidth = img.width * 0.9;
        const cropHeight = img.height * 0.9;

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = cropWidth / cropHeight;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img, 
          cropX, cropY, cropWidth, cropHeight, 
          offsetX, offsetY, drawWidth, drawHeight
        );
      }
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(latest);
    });
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      unsubscribe();
    };
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#0f0f11]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" /> {/* Dark overlay for text readability */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <OverlayText scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}

function OverlayText({ scrollYProgress }: { scrollYProgress: import("framer-motion").MotionValue<number> }) {
  const y1 = useTransform(scrollYProgress, [0, 0.15, 0.3], [100, 0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.3], [0, 1, 1, 0]);

  const y2 = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [100, 0, -100]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);

  const y3 = useTransform(scrollYProgress, [0.65, 0.8, 1], [100, 0, -100]);
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto px-6 font-sans">
      <motion.div 
        style={{ y: y1, opacity: opacity1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center"
      >
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
          Shreyans Jaiswal <br className="md:hidden" />
          <span className="hidden md:inline text-blue-500 mx-4">—</span> 
          <span className="text-gray-300 font-light">Creative Developer</span>
        </h2>
      </motion.div>

      <motion.div 
        style={{ y: y2, opacity: opacity2 }}
        className="absolute top-1/2 left-6 md:left-24 w-full md:w-1/2 text-left -translate-y-1/2"
      >
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white drop-shadow-2xl opacity-90 leading-tight">
          I build <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400 font-bold">AI-powered</span> <br/>
          digital experiences
        </h2>
      </motion.div>

      <motion.div 
        style={{ y: y3, opacity: opacity3 }}
        className="absolute top-1/2 right-6 md:right-24 w-full md:w-1/2 text-right -translate-y-1/2"
      >
        <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white drop-shadow-2xl opacity-80 leading-tight">
          Bridging <span className="font-semibold text-white">design</span>,<br/>
          systems, and <br/>
          <span className="font-semibold text-orange-400">intelligence.</span>
        </h2>
      </motion.div>
    </div>
  );
}
