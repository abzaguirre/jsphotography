"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { TImage } from "@/models/image";


function GalleryCategories() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });
    const [carouselOpen, setCarouselOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImageCategory, setSelectedImageCategory] = useState("");
    const [categories, setCategories] = useState<Record<string, TImage[]>>({})
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
                const response = await fetch("/uploads/categories/categories.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: Record<string, string[]> = await response.json();
                const orientation = ["row-span-1", "row-span-2", ""];
                const formattedCategories: Record<string, TImage[]> = {};

                Object.entries(data).forEach(([category, files]) => {
                    formattedCategories[category] = files.map((file) => ({
                        src: `/uploads/categories/${category}/${file}`,
                        width: "1000",
                        height: "100",
                        alt: category,
                        className: orientation[Math.floor(Math.random() * orientation.length)],
                    }));
                });

                console.log("Processed Images:", formattedCategories);
                setCategories(formattedCategories);
            } catch (error) {
                console.error("Error fetching images:", error);
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
                        <Image
                            src={categories[category][0].src}
                            width={1000}
                            height={100}
                            alt={capitalizeFirstLetter(category)}
                            className="w-full h-full object-cover transition-transform duration-500"
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
