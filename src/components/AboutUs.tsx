import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function AboutUs() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [translateValues, setTranslateValues] = useState(["-60vw", "-25vw"]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setTranslateValues(["-40%", "0%"]);
            } else {
                setTranslateValues(["-60vw", "-25vw"]);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <motion.section
            ref={ref}
            className="relative min-h-screen flex flex-col md:flex-row items-center justify-end"
        >
            <motion.div
                initial={{ x: translateValues[0] }}
                animate={isInView ? { x: translateValues[1] } : {}}
                transition={{ duration: 1 }}
                className="w-40 h-100 bg-blue-500 rounded-full"
            />
            <motion.div
                className="w-[80%] md:w-1/2 h-[100vh] flex flex-col gap-8 py-10 items-start md:pr-10 text-left"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                    duration: 0.6,
                    scale: { type: "spring", bounce: 0.4 },
                }}
            >
                <h1 className="text-5xl font-bold mt-8">Hi, I am James.</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </motion.div>
        </motion.section>
    );
}
