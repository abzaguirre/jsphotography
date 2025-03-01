import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import hero from "../assets/images/hero_img.jpg";

function GalleryCategories() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

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

    return (
        <motion.div
            ref={ref} // Attach ref here
            className="flex flex-wrap w-full my-20"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {Array(3)
                .fill("")
                .map((_, index) => (
                    <motion.div
                        key={index}
                        className="md:w-1/3 p-10" // Ensures each item takes up 33% width
                        variants={itemVariants} // Apply animation to each item
                    >
                        <div className="relative overflow-hidden rounded-lg group border-2 border-white ">
                            <img
                                src={hero}
                                alt="hehehe"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-55 transition-opacity duration-300 flex items-end">
                                <p className="text-white p-4 text-sm md:text-base font-medium">
                                    hehehe
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
        </motion.div>
    );
}

export default GalleryCategories;
