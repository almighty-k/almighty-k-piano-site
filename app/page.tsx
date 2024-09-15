"use client";

import { useState, useRef, useEffect } from "react";
import { Music, ChevronLeft, ChevronRight, List } from "lucide-react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PianoKeys } from "@/components/piano-keys";

const videos = [
  {
    url: "https://www.youtube.com/watch?v=M2H3fg5Kup8",
    title: 'Beethoven: Sonata No. 23  "Appassionata" 3rd Movement',
  },
  {
    url: "https://www.youtube.com/watch?v=AR4exdom3DE",
    title: "Debussy: La fille aux cheveux de lin",
  },
  {
    url: "https://www.youtube.com/watch?v=2ziHzHtF8Dw",
    title: "Aiko: Mutual Love",
  },
  {
    url: "https://www.youtube.com/watch?v=PeIjWniaqz4",
    title: "Joe Hisaishi: Merry-Go-Round of Life",
  },
  {
    url: "https://www.youtube.com/watch?v=dxvvHlNOpAI",
    title: "Joe Hisaishi: Ashitaka and San",
  },
  {
    url: "https://www.youtube.com/watch?v=X7YI98ruJBk",
    title: "Yorushika: Haru",
  },
  {
    url: "https://www.youtube.com/watch?v=jC-eoHodoOs",
    title: "Chopin: Nocturne No. 8 Op. 27 No. 2",
  },
];

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const changeVideo = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleEnded = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    changeVideo(nextIndex);
  };

  const scrollVideos = (direction: "left" | "right") => {
    const newIndex =
      direction === "left"
        ? (currentVideoIndex - 1 + videos.length) % videos.length
        : (currentVideoIndex + 1) % videos.length;
    changeVideo(newIndex);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  return (
    <motion.div
      className="max-w-6xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <Music size={48} className="text-[#D4AF37]" />
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-white">
              Almighty<span className="text-[#D4AF37]">-K</span>
            </h1>
            <p className="text-[#D4AF37] italic">My Piano Performances</p>
          </div>
        </motion.div>
      </div>
      <div className="mb-8 opacity-60">
        <PianoKeys />
      </div>
      <motion.div
        className="relative aspect-video rounded-lg overflow-hidden shadow-2xl mb-8"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <div
          ref={carouselRef}
          className="flex w-full h-full overflow-x-hidden snap-x snap-mandatory"
        >
          {isClient &&
            videos.map((video, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 snap-center"
              >
                <ReactPlayer
                  url={video.url}
                  width="100%"
                  height="100%"
                  playing={isPlaying && index === currentVideoIndex}
                  onEnded={handleEnded}
                  controls
                />
              </div>
            ))}
        </div>

        <button
          onClick={() => scrollVideos("left")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
          aria-label="Previous video"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scrollVideos("right")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition-colors"
          aria-label="Next video"
        >
          <ChevronRight size={24} />
        </button>
      </motion.div>

      <Dialog>
        <DialogTrigger asChild>
          <button className="fixed bottom-4 right-4 bg-[#D4AF37] text-black p-2 rounded-full shadow-lg hover:bg-[#B8860B] transition-colors">
            <List size={24} />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#1C0C0C] text-white border-[#D4AF37]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-[#D4AF37] mb-4">
              Piano List
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] w-full">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                className={`flex items-center space-x-2 p-2 cursor-pointer ${
                  index === currentVideoIndex
                    ? "bg-[#D4AF37] text-black"
                    : "hover:bg-[#2C1A0A]"
                }`}
                onClick={() => {
                  changeVideo(index);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={`https://img.youtube.com/vi/${
                    video.url.split("v=")[1]
                  }/default.jpg`}
                  alt={video.title}
                  className="object-cover rounded"
                  width={64}
                  height={64}
                />

                <p className="font-serif">{video.title}</p>
              </motion.div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
