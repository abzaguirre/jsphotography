import { motion, useScroll, useTransform } from "framer-motion";
import cameraImage from "../assets/images/camera.png"; // Adjust path if needed

const Camera = () => {
  const { scrollYProgress } = useScroll();

  // Rising effect for the camera (emerging from box)
  const cameraY = useTransform(scrollYProgress, [0, 0.3], [10, -150]);
  const circleY = useTransform(scrollYProgress, [0, 0.3, 0.6], [50, -120, -400]);
  const circleX = useTransform(scrollYProgress, [0, 0.3], [-38.5, -38.5]);

  // Zoom effect (0.3 to 0.8)
  const scale = useTransform(scrollYProgress, [0.3, 0.9], [1, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.31, 0.85], [0, 0, 0.5, 0]);

  // Dynamic z-index
  const zIndex = useTransform(scrollYProgress, [0, 0.3], [10, 60]);

  // Circle grows in size
  const size = useTransform(scrollYProgress, [0.3, 0.8], [20, 500]);

  // Move the box out of view instead of changing opacity
  const boxY = useTransform(scrollYProgress, [0.3, 0.8], [0, -600]); // Moves up

  return (
    <>
      {/* Box that moves out of view while zooming */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 w-32 h-32 border-4 border-red-500 rounded-lg z-30"
        style={{ y: boxY }}
      >
        <div className="w-full h-full bg-black flex items-center justify-center z-20">
          {/* Camera appears from inside the box */}
          <motion.div style={{ y: cameraY, zIndex: "-999" }}>
            <img src={cameraImage} alt="Camera" width={120} height={100} />
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
