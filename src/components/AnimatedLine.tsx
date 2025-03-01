import { motion } from "framer-motion";

interface AnimatedLineProps {
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "horizontal" | "vertical" | "diagonal-right" | "diagonal-left";
  isInView?: boolean;
}

const AnimatedLine = ({ 
  delay = 0, 
  duration = 1.5, 
  className = "", 
  direction = "horizontal",
  isInView = false
}: AnimatedLineProps) => {
  
  const getLineStyles = () => {
    switch (direction) {
      case "vertical":
        return "h-0 w-[2px] origin-top";
      case "diagonal-right":
        return "w-0 h-[2px] origin-left rotate-45 transform";
      case "diagonal-left":
        return "w-0 h-[2px] origin-right -rotate-45 transform";
      case "horizontal":
      default:
        return "w-0 h-[2px] origin-left";
    }
  };

  const getAnimationVariants = () => {
    switch (direction) {
      case "vertical":
        return {
          hidden: { height: 0 },
          visible: { height: "100%" }
        };
      case "diagonal-right":
      case "diagonal-left":
      case "horizontal":
      default:
        return {
          hidden: { width: 0 },
          visible: { width: "100%" }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      className={`bg-black ${getLineStyles()} ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration, 
        delay,
        ease: [0.43, 0.13, 0.23, 0.96] // Elegant easing function
      }}
    />
  );
};

export default AnimatedLine;