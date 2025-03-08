import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import hero from "../assets/images/hero_img.jpg";
import ImageCarousel from "./ImageCarousel";
import { galleryImages } from "../constants/gallery";

function GalleryCategories() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });
    const [carouselOpen, setCarouselOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setCarouselOpen(true);
    };

    return (
        <motion.div
            ref={ref} // Attach ref here
            className="flex flex-wrap w-full md:px-50"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {Array(3)
                .fill("")
                .map((_, index) => (
                    <div
                        key={index}
                        className="md:w-1/3 pb-20" // Ensures each item takes up 33% width

                    >
                        <motion.div
                            onClick={() => handleImageClick(index)}
                            className="relative overflow-hidden rounded-lg group border-2 border-white max-w-[60%] mx-auto aspect-[9/16] cursor-pointer group"
                            variants={itemVariants} // Apply animation to each item
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}>
                            {/* Make the image container thinner with max-width and margin auto */}
                            <img
                                src={hero}
                                alt="hehehe"
                                className="w-full h-full object-cover transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-55 transition-opacity duration-300 flex items-end">
                                <p className="text-white p-4 text-sm md:text-base font-medium">
                                    hehehe
                                </p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            <AnimatePresence>
                {carouselOpen && (
                    <ImageCarousel
                        images={galleryImages}
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
