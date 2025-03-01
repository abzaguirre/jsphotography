import { motion, useScroll, useTransform } from "framer-motion";
import cameraImage from "../assets/images/camera.png";

const Camera = () => {
  const { scrollYProgress } = useScroll();
  // Rising effect for the camera (emerging from box)
  const cameraY = useTransform(scrollYProgress, [0, 0.3], [10, -150]);
  const circleY = useTransform(scrollYProgress, [0, 0.3, 0.6], [50, -120, -400]);
  const circleX = useTransform(scrollYProgress, [0, 0.3], [-38.5, -38.5]);
  // Zoom effect - FASTER now (0.3 to 0.6 instead of 0.3 to 0.9)
  const scale = useTransform(scrollYProgress, [0.3, 0.6], [1, 20]); // Increased max scale and shortened duration
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.31, 0.6], [0, 0, 0.5, 0]); // Shortened fade out
  // Dynamic z-index
  const zIndex = useTransform(scrollYProgress, [0, 0.3], [10, 60]);
  // Circle grows in size - FASTER now
  const size = useTransform(scrollYProgress, [0.3, 0.6], [20, 800]); // Increased max size and shortened duration
  // Move the box out of view faster
  const boxY = useTransform(scrollYProgress, [0.3, 0.6], [0, -700]); // Moves up faster
  
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
            <img src={cameraImage} alt="Camera" width={120} height={100} />
          </motion.div>
        </div>
      </motion.div>
      {/* Circle animation (Zoom Effect) - Now faster */}
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