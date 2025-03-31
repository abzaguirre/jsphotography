/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import ImageCarousel from "./ImageCarousel";
import { TImage } from "@/models/image";

const GallerySection = () => {
  const ref = useRef(null);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [galleryPhotos, setGalleryPhotos] = useState<TImage[]>([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setCarouselOpen(true);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderId = "1YnEEVpnI-T239Vk7v199RQUBUkuFU4Yx";
        const apiKey = "AIzaSyCGX7ezdCPsTwIzM0_VyP13IBQ8-uZ_GNg";

        if (!folderId || !apiKey) {
          console.error("Missing Google API credentials.");
          return;
        }

        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Filter only image files and construct direct Google Drive links
        const images: TImage[] = data.files
          .filter((file: { mimeType: string }) =>
            file.mimeType.startsWith("image/")
          )
          .map((file: { id: string; name: string }) => ({
            src: `https://lh3.googleusercontent.com/d/${file.id}=w1000`,
            width: "1000",
            height: "1000",
            alt: file.name,
            className: ["row-span-1", "row-span-2", ""][
              Math.floor(Math.random() * 3)
            ],
          }));

        setGalleryPhotos(images);
      } catch (error) {
        console.error("Error fetching Google Drive images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ opacity }}
    >
      <div className="w-full mx-auto">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3"
          >
            Our Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white"
          >
            Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground mt-3 max-w-2xl text-left"
          >
            Explore our curated collection. Click on any image to view in
            detail.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {galleryPhotos.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-xl ${image.className} cursor-pointer group`}
              onClick={() => handleImageClick(index)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-full h-full aspect-square overflow-hidden bg-muted"
                whileHover="hover"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover transition-transform duration-1000"
                  loading="lazy"
                />
                <motion.div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white bg-gradient-to-t from-black/60 to-transparent w-full">
                    <p className="text-xs text-white/80 mt-1">Click to view</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {carouselOpen && (
          <ImageCarousel
            type="GALLERY"
            images={galleryPhotos}
            initialIndex={selectedImageIndex}
            isOpen={carouselOpen}
            onClose={() => setCarouselOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default GallerySection;
