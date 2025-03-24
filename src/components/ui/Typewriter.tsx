"use client"

import { cn } from "@/lib/utils";
import { motion, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function Typewriter({ value, className, textY }: { value: string, className?: string, textY: MotionValue<number> }) {

    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        setDisplayedText("");
        let i = 0;
        const interval = setInterval(() => {
            if (i < value.length) {
                setDisplayedText(value.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [value]);
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 w-[22rem] md:w-[32rem] h-32"
            style={{ y: textY }}
        >
            <h1 className={cn("font-bold md:text-5xl text-3xl leading-13 text-white text-center", className)}>
                {displayedText}
                <span className="inline-block w-[10px] text-red-500 text-center">
                    {showCursor ? "|" : ""}
                </span>
            </h1>
        </motion.div>
    );
}