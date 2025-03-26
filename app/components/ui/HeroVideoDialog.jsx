"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const HeroVideoDialog = ({
  className,
  animationStyle,
  videoSrc,
  thumbnailSrc,
  thumbnailAlt,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.img
        src={thumbnailSrc}
        alt={thumbnailAlt}
        className={`${className} w-full h-auto cursor-pointer`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
      {isOpen && (
        <motion.div
          initial={animationStyle === "from-center" ? { scale: 0 } : { y: "100%" }}
          animate={animationStyle === "from-center" ? { scale: 1 } : { y: 0 }}
          exit={animationStyle === "from-center" ? { scale: 0 } : { y: "100%" }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-4xl h-64 md:h-[500px]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video
          >
            <iframe
              src={`${videoSrc}&autoplay=1`} // Autoplay when modal opens
              title={thumbnailAlt}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default HeroVideoDialog;