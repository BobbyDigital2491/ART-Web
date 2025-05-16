'use client';
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const VelocityText = ({ heading, subheading }) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["0.5 0.5", "0.8 0.5"], // Start animation when component is at the middle of the viewport
  });

  // Using scrollYProgress to directly transform the x position of the text
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -2000]); // Adjust the final value as needed
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  return (
    <section
      ref={targetRef}
      className="h-[50vh] bg-neutral-50 text-neutral-950 overflow-hidden"
    >
      <div className="sticky top-0 flex h-full items-center overflow-hidden">
        <motion.p
          style={{ x }}
          className="origin-bottom-left whitespace-nowrap items-start text-5xl font-black uppercase leading-[0.85] md:text-7xl md:leading-[0.85]"
        >
          {heading}
        </motion.p>
        {subheading && (
          <motion.p
            style={{ x }}
            className="origin-bottom-left whitespace-nowrap items-start text-2xl font-bold leading-[0.85] md:text-4xl md:leading-[0.85]"
          >
            {subheading}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default VelocityText;