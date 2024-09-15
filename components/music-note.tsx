"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MusicNote = ({ delay, size }: { delay: number; size: number }) => {
  const [isClient, setIsClient] = useState(false);
  const [randomX, setRandomX] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
    setRandomX(Math.random() * window.innerWidth);
    setNote(["♪", "♫", "♬", "♩"][Math.floor(Math.random() * 4)]);
  }, []);

  if (!isClient) return null;

  return (
    <motion.div
      className="absolute text-[#D4AF37] opacity-50 z-0"
      initial={{ opacity: 0, y: -100, x: randomX }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: ["-10vh", "110vh"],
      }}
      transition={{
        duration: 10,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5,
      }}
      style={{
        fontSize: `${size}px`,
      }}
    >
      {note}
    </motion.div>
  );
};
