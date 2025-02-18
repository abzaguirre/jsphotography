import { motion } from "framer-motion";
import { cn } from "../utils/cn";
interface TabListProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
  categories: string[];
}
export default function TabList({ activeTab, setActiveTab, categories }: TabListProps) {
  return (
    <div className="w-1/4 flex flex-col gap-4">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => setActiveTab(index)}
          className={cn(
            "relative px-4 py-2 text-left text-lg font-medium transition-all duration-300",
            activeTab === index ? "text-red-500" : "text-gray-500 hover:text-gray-700"
          )}
          whileHover={{ x: 4 }}
          animate={{
            scale: activeTab === index ? 1.05 : 1,
          }}
        >
          {activeTab === index && (
            <motion.div
              layoutId="activeTab"
              className="absolute left-0 top-0 w-1 h-full bg-red-500 rounded-full"
            />
          )}
          {category}
        </motion.button>
      ))}
    </div>
  );
}