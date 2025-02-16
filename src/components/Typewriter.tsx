import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

export default function Typewriter({ value, className }: { value: string, className?: string }) {
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const { scrollYProgress } = useScroll();
    const textY = useTransform(scrollYProgress, [0.3, 0.8], [-250, -900]); // Moves up

    useEffect(() => {
        setDisplayedText(""); // Reset text when value changes
        let i = 0;
        const interval = setInterval(() => {
            if (i < value.length) {
                setDisplayedText(value.slice(0, i + 1)); // Use slice to ensure correct updates
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
        <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.5 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 w-[23rem] md:w-[40rem] h-32 z-30"
            style={{ y: textY }}>
            <h1 className={cn("font-bold md:text-5xl text-3xl", className)}>
                {displayedText}
                <span className="inline-block w-[10px] text-red-500 text-center">
                    {showCursor ? "|" : ""}
                </span>
            </h1>

        </motion.div>
    );
}
