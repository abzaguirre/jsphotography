"use client";
import { motion, useInView } from "framer-motion";
import AnimatedLine from "./AnimatedLine";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [translateValues, setTranslateValues] = useState(["-60vw", "-25vw"]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (screenWidth < 640) {
        setTranslateValues(["-40%", "0%"]);
      } else if (
        screenWidth >= 640 &&
        screenWidth <= 768 &&
        screenHeight === 833
      ) {
        setTranslateValues(["-60vw", "-8vw"]);
      } else if (screenWidth === 1024 && screenHeight === 833) {
        setTranslateValues(["-60vw", "-10vw"]);
      } else {
        // Adjust for other screen sizes
        setTranslateValues(["-60vw", "-20vw"]);
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
      transition: { delay: 0.004 + i * 0.1, duration: 0.5 },
    }),
  };

  const aboutDescription = [
    "Hey there! I’m James, a passionate photographer with a some years of experience exploring the art of photography as a hobby. I love capturing the beauty in everyday moments, whether it’s landscapes, portraits, or candid shots.",
    "Join me on this journey as I learn, grow, and share my passion for photography! I’m excited to connect with fellow photography enthusiasts and exchange tips, inspiration, and ideas. Let’s create something beautiful together!",
    "Feel free to reach out or follow my journey. Happy shooting!",
  ];

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
          delay={0.2}
          direction="diagonal-right"
          className="absolute -top-10 -left-10 h-48 bg-gray-400"
          isInView={isInView}
        />
        <AnimatedLine
          delay={0.2}
          direction="diagonal-left"
          className="absolute top-60 right-0 w-40 bg-gray-400"
          isInView={isInView}
        />
        {/* Decorative circle */}
        <motion.img
          initial={{ x: translateValues[0] }}
          animate={isInView ? { x: translateValues[1] } : {}}
          transition={{ duration: 1 }}
          className=" rounded-full"
          src="/logo.png"
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

            {aboutDescription.map((item, index) => (
              <motion.p
                key={index}
                custom={index + 1}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={textVariants}
                className="text-neutral-400"
              >
                {item}
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
