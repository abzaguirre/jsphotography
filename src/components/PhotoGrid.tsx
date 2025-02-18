import { motion } from "framer-motion";
interface PhotoGridProps {
  category: string;
}
// Sample photo data - replace with your actual photos
const photos = {
  solo: Array(16).fill("/placeholder.svg"),
  partner: Array(16).fill("/placeholder.svg"),
  events: Array(16).fill("/placeholder.svg"),
};
export default function PhotoGrid({ category }: PhotoGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-3/4 grid grid-cols-4 gap-4 overflow-y-auto pr-4 max-h-full"
      key={category}
    >
      {photos[category as keyof typeof photos].map((src, index) => (
        <motion.div
          key={`${category}-${index}`}
          variants={item}
          className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
          whileHover={{ y: -5 }}
        >
          <img
            src={src}
            alt={`${category} photo ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}