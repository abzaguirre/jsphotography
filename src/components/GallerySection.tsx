import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import hero from '../assets/images/hero_img.jpg'

const galleryImages = [
    {
        src: "https://drive.google.com/thumbnail?id=1cG-LTBEgIKdT8rNx477hiV7mdBwKh1K-&sz=w1000",
        alt: "Person typing on laptop",
        className: "row-span-2" // Vertical rectangle (tall)
    },
    {
        src: hero,
        alt: "Computer tech",
        className: "" // Square
    },
    {
        src: hero,
        alt: "Person working on laptop",
        className: "row-span-2" // Vertical rectangle (tall)
    },
    {
        src: hero,
        alt: "Robot",
        className: "" // Square
    },
    {
        src: hero,
        alt: "Digital code",
        className: "col-span-2" // Horizontal rectangle (wide)
    },
    {
        src: hero,
        alt: "Cat",
        className: "row-span-2" // Vertical rectangle (tall)
    },
    {
        src: hero,
        alt: "Person in tech workspace",
        className: "" // Square
    },
    {
        src: hero,
        alt: "Glowing tech",
        className: "" // Square
    },
    {
        src: hero,
        alt: "Person typing on laptop",
        className: "row-span-2" // Vertical rectangle (tall)
    },
    {
        src: hero,
        alt: "Computer tech",
        className: "" // Square
    },
    {
        src: hero,
        alt: "Person working on laptop",
        className: "row-span-2" // Vertical rectangle (tall)
    },
    {
        src: hero,
        alt: "Robot",
        className: "" // Square
    },
    {
        src: hero,
        alt: "Robot",
        className: "" // Square
    },
];


export default function GallerySection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        }
    };
    const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
    return (
        <motion.section
            ref={ref}
            className="relative min-h-screen flex flex-col items-center justify-center"
            style={{ opacity }}
        >
            <div className="max-w-8xl mx-4 mt-5">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-5xl font-bold mb-8 text-center"
                >
                    Gallery
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`relative overflow-hidden rounded-lg ${image.className}`}
                        >
                            <motion.img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <motion.div
                                className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-65 transition-opacity duration-300 flex items-end"
                            >
                                <p className="text-white p-4 text-sm md:text-base font-medium">
                                    {image.alt}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
             
            </div>
        </motion.section>
    );
}