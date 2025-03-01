import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AnimatedLine from "../components/AnimatedLine";

const Index = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
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

    // Staggered text reveal animation
    const textVariants = {
        hidden: { opacity: 0 },
        visible: (i: number) => ({
            opacity: 1,
            transition: {
                delay: 1.8 + (i * 0.1),
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        })
    };

    return (
        <div className="min-h-screen overflow-hidden">
            <motion.section
                ref={ref}
                className="relative min-h-screen flex flex-col md:flex-row items-center justify-end px-6 md:px-12"
            >
                <AnimatedLine
                    delay={0.2}
                    className="absolute top-24 left-0 right-0 bg-gray-400"
                    isInView={isInView}
                />
                <AnimatedLine
                    delay={0.8}
                    direction="diagonal-right"
                    className="absolute -top-10 -left-10 h-48 bg-gray-400"
                    isInView={isInView}
                />
                <AnimatedLine
                    delay={0.8}
                    direction="diagonal-left"
                    className="absolute top-60 right-0 w-40 bg-gray-400" 
                    isInView={isInView}
                />
                {/* Decorative circle */}
                <motion.div
                    initial={{ x: translateValues[0] }}
                    animate={isInView ? { x: translateValues[1] } : {}}
                    transition={{ duration: 1 }}
                    className="w-40 h-100 bg-blue-500 rounded-full"
                />

                {/* Content container */}
                <div className="w-[90%] md:w-1/2 h-auto min-h-[80vh] flex flex-col py-10 items-start md:pr-10 text-left relative z-10">

                    {/* Animated lines with increased visibility and better positioning */}
                    <div className="absolute inset-0 overflow-visible">
                        <AnimatedLine
                            delay={0.2}
                            className="absolute top-24 left-0 right-0 bg-gray-400"
                            isInView={isInView}
                        />

                        <AnimatedLine
                            delay={0.8}
                            direction="vertical"
                            className="absolute -top-10 -left-10 h-48 bg-gray-400"
                            isInView={isInView}
                        />

                    </div>

                    {/* Text content with animations */}
                    <motion.div
                        className="mt-20 space-y-8 max-w-lg"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 1.6 }}
                    >
                        <motion.h2
                            custom={0}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={textVariants}
                            className="text-4xl font-bold text-gray-300"
                        >
                            Hi, I am James.
                        </motion.h2>

                        {[0, 1, 2].map((index) => (
                            <motion.p
                                key={index}
                                custom={index + 1}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={textVariants}
                                className="text-neutral-400"
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                {index === 0 && " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                            </motion.p>
                        ))}
                    </motion.div>
                </div>
                <AnimatedLine
                    delay={0.2}
                    className="absolute bottom-10 left-0 right-0 bg-gray-400"
                    isInView={isInView}
                />
            </motion.section>

        </div>
    );
};

export default Index;
