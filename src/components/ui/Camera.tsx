import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import cameraImage from "@/assets/images/camera.png";

const Camera = () => {
  const { scrollYProgress } = useScroll();

  // Rising effect for the camera - FASTER SPEED
  const cameraY = useTransform(scrollYProgress, [0, 0.12], [10, -150]);
  const circleY = useTransform(scrollYProgress, [0, 0.12, 0.35], [50, -120, -400]);
  const circleX = useTransform(scrollYProgress, [0, 0.12], [-38.5, -38.5]);

  // Zoom effect - FASTER SPEED
  const scale = useTransform(scrollYProgress, [0.12, 0.35], [1, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.13, 0.35], [0, 0, 0.5, 0]);

  // Dynamic z-index - FASTER SPEED
  const zIndex = useTransform(scrollYProgress, [0, 0.12], [10, 60]);

  // Circle grows in size - FASTER SPEED
  const size = useTransform(scrollYProgress, [0.12, 0.35], [20, 800]);

  // Move the box out of view - FASTER SPEED
  const boxY = useTransform(scrollYProgress, [0.12, 0.35], [0, -700]);

  return (
    <>
      {/* Box that moves out of view while zooming */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 w-48 h-48 border-4 border-red-500 rounded-lg z-30"
        style={{ y: boxY }}
      >
        <div className="w-full h-full bg-black flex items-center justify-center z-20">
          {/* Camera appears from inside the box */}
          <motion.div style={{ y: cameraY, zIndex: "-999" }}>
            <Image src={cameraImage} alt="Camera" width={120} height={100} />
          </motion.div>
        </div>
      </motion.div>

      {/* Circle animation (Zoom Effect) */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 w-10 h-10 pointer-events-none"
        style={{
          scale,
          y: circleY,
          x: circleX,
          opacity,
          zIndex,
          width: size,
          height: size,
        }}
      >
        <div className="w-full h-full rounded-full bg-white shadow-2xl" />
      </motion.div>
    </>
  );
};

export default Camera;