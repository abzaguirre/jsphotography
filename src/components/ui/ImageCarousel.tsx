/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface Image {
  src: string;
  alt: string;
  className?: string;
}

interface ImageCarouselProps {
  type: "GALLERY" | "CATEGORY";
  images: Image[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageCarousel = ({
  type,
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(
    type === "GALLERY" ? initialIndex : 0
  );
  const [direction, setDirection] = useState(0);

  const navigateImages = useCallback(
    (dir: number) => {
      setDirection(dir);
      const newIndex = (currentIndex + dir + images.length) % images.length;
      setCurrentIndex(newIndex);
    },
    [currentIndex, images.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        navigateImages(-1);
      } else if (e.key === "ArrowRight") {
        navigateImages(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Lock body scroll when carousel is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex, onClose, navigateImages]);

  if (!isOpen) return null;
  const variants = {
    enter: (custom: number) => ({
      x: custom > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (custom: number) => ({
      x: custom > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.8)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
        onClick={onClose}
      >
        <X className="w-8 h-8" />
      </button>

      <button
        className="absolute left-4 md:left-8 text-white p-2 rounded-full hover:bg-white/10 transition-all z-40
                  transform active:scale-95"
        onClick={() => navigateImages(-1)}
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full flex items-center justify-center p-4 md:p-12"
          >
            <div className="relative max-w-5xl max-h-full">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                width="1000"
                height="500"
                className="object-contain max-h-[85vh] w-auto mx-auto rounded-lg shadow-2xl"
              />
              <div
                className="absolute bottom-0 left-0 right-0 text-white p-4 rounded-b-lg"
                style={{ background: "rgba(0,0,0,0.8)" }}
              >
                <p className="text-center text-sm mt-1">
                  {currentIndex + 1} / {images.length}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="absolute right-4 md:right-8 text-white p-2 rounded-full hover:bg-white/10 transition-all z-40
                  transform active:scale-95"
        onClick={() => navigateImages(1)}
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
      </button>
    </motion.div>
  );
};

export default ImageCarousel;
