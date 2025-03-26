"use client";

import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const MagicText1 = ({ words, className, filter = true, duration = 0.5 }) => {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" }); // Trigger when 50px from bottom
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView && scope.current) {
      animate(
        "span",
        { opacity: 1, filter: filter ? "blur(0px)" : "none" },
        { duration: duration || 1, delay: stagger(0.2) }
      );
    }
  }, [isInView, scope, animate, filter, duration, words]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline-block">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="dark:text-yellow-400 text-yellow-400 opacity-0 inline-block mr-2 md:mr-4"
            style={{ filter: filter ? "blur(10px)" : "none" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div ref={ref} className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-white text-5xl sm:text-7xl md:text-8xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default MagicText1;