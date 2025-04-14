/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { TFolder, TImage } from "@/models/image";

function GalleryCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImageCategory, setSelectedImageCategory] = useState("");
  const [categories, setCategories] = useState<Record<string, TImage[]>>({});
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleImageClick = (index: number, category: string) => {
    setSelectedImageIndex(index);
    setSelectedImageCategory(category);
    setCarouselOpen(true);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const categoriesFolderId = "1Yiqdc4UXAp6bvVzYR4J4in5WmAHTVP5K"; // Parent categories folder
        const apiKey = "AIzaSyCGX7ezdCPsTwIzM0_VyP13IBQ8-uZ_GNg";

        if (!categoriesFolderId || !apiKey) {
          console.error("Missing Google API credentials.");
          return;
        }

        const subfolderResponse = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${categoriesFolderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${apiKey}&fields=files(id,name)`
        );

        if (!subfolderResponse.ok) {
          throw new Error(`HTTP error! Status: ${subfolderResponse.status}`);
        }

        const subfolderData = await subfolderResponse.json();

        const categoriesFolder: Record<string, TImage[]> = {};

        for (const subfolder of subfolderData.files) {
          const subfolderId = subfolder.id; // Get subfolder ID
          const subfolderName = subfolder.name.toLowerCase(); // Use folder name as key

          const imagesResponse = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${subfolderId}'+in+parents+and+mimeType contains 'image/'&key=${apiKey}&fields=files(id,name)`
          );

          if (!imagesResponse.ok) {
            throw new Error(`HTTP error! Status: ${imagesResponse.status}`);
          }

          const imagesData = await imagesResponse.json();
          console.log(`Images in ${subfolderName}:`, imagesData.files);

          // Store images under the correct subfolder name
          categoriesFolder[subfolderName] = imagesData.files.map(
            (file: TFolder) => ({
              src: `https://lh3.googleusercontent.com/d/${file.id}=w1000`, // Correct format for Google Drive images
              width: "1000",
              height: "100",
              alt: file.name,
            })
          );
        }

        setCategories(categoriesFolder);
      } catch (error) {
        console.error("Error fetching Google Drive images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="flex flex-wrap w-full md:px-50"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Object.keys(categories).map((category, index) => (
        <div key={index} className="md:w-1/3 mt-20 mb-10">
          <motion.div
            onClick={() => handleImageClick(index, category)}
            className="relative overflow-hidden rounded-lg group border-2 border-white max-w-[60%] mx-auto aspect-[9/16] cursor-pointer group"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={categories[category][0].src}
              alt="Gallery Image"
              width={1000}
              height={1000}
              className="w-full h-full object-cover transition-transform duration-1000"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-55 transition-opacity duration-300 flex items-end">
              <p className="text-white p-4 text-2xl md:text-2xl font-medium">
                {capitalizeFirstLetter(category)}
              </p>
            </div>
          </motion.div>
        </div>
      ))}
      <AnimatePresence>
        {carouselOpen && (
          <ImageCarousel
            type="CATEGORY"
            images={categories[selectedImageCategory]}
            initialIndex={selectedImageIndex}
            isOpen={carouselOpen}
            onClose={() => setCarouselOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default GalleryCategories;
