import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ContactUs() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
    return (
        <motion.section
            ref={ref}
            className="relative min-h-screen flex flex-col items-center justify-center bg-gray-200"
            style={{ opacity }}
        >
            <h2 className="text-4xl font-bold">Contact</h2>
        </motion.section>
    );
}