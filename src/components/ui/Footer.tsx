"use client"

import Facebook from "@/assets/icons/Facebook";
import Instagram from "@/assets/icons/Instagram";
import Tiktok from "@/assets/icons/Tiktok";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function Footer() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
            className="relative h-[30vh] flex flex-wrap md:flex-nowrap items-center justify-center gap-x-96"
            style={{ opacity }}
        >
            <div className="w-1/2 h-full flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    className="w-1/4 bg-blue-500 h-3/4"
                >
                    <h1>logo</h1>
                </motion.div>
            </div>
            <div className="w-1/2 bg-blue min-h-full flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-white"
                >
                    Follow us on
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    className="flex gap-x-10 justify-center mt-10 space-y-10"
                >
                    <Link
                        href="https://www.instagram.com/jsincuyaphotog?igsh=MXVsaWc3YTZqNm1zOQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="inline-flex items-center justify-center w-12 h-12 transition-transform duration-300 hover:scale-110"

                    >
                        <Instagram />
                    </Link>
                    <Link
                        href="https://www.facebook.com/share/1EKGpYrxya/?mibextid=qi2Omg"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="inline-flex items-center justify-center w-12 h-12 transition-transform duration-300 hover:scale-110"

                    >
                        <Facebook />
                    </Link>
                    <Link
                        href="https://www.tiktok.com/@jsincuyaphotog?_t=ZS-8uX5r7TeYfX&_r=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="inline-flex items-center justify-center w-12 h-12 transition-transform duration-300 hover:scale-110"

                    >
                        <Tiktok />
                    </Link>

                </motion.div>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3 tracking-wide"
                >
                    COPYRIGHTS © 2025 | JAMES SINCUYA
                </motion.span>
            </div>
        </motion.section >
    );
}