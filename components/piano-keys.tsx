import { motion } from "framer-motion";

export const PianoKeys = () => (
  <motion.svg
    className="w-full h-24"
    viewBox="0 0 100 20"
    preserveAspectRatio="none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
  >
    {[...Array(14)].map((_, i) => (
      <motion.rect
        key={`white-${i}`}
        x={i * 7.14}
        y="0"
        width="7.14"
        height="20"
        fill="#FFFFFF"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: i * 0.05 }}
      />
    ))}
    {[0, 1, 3, 4, 5, 7, 8, 10, 11, 12].map((i) => (
      <motion.rect
        key={`black-${i}`}
        x={i * 7.14 + 5}
        y="0"
        width="4.28"
        height="12"
        fill="#000000"
        initial={{ y: 12 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: i * 0.05 + 0.5 }}
      />
    ))}
  </motion.svg>
);
