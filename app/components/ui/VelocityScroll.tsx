'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface VelocityScrollProps {
  heading: string;
  subheading?: string | null;
}

const VelocityScroll: React.FC<VelocityScrollProps> = ({ heading, subheading }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  // Calculate text width for dynamic x transform
  useEffect(() => {
    if (targetRef.current) {
      const width = targetRef.current.offsetWidth;
      setTextWidth(width);
    }
  }, [heading, subheading]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end center'],
  });

  // Transform x based on text width for smooth animation
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -textWidth * 0.8]);
  const x = useSpring(xRaw, { mass: 0.5, stiffness: 100, damping: 20 });

  return (
    <section
      ref={targetRef}
      className="relative min-h-[40vh] bg-gray-900 text-white overflow-hidden"
      aria-label="Animated scrolling text section"
    >
      <div className="sticky top-0 flex h-[40vh] items-center justify-start px-4">
        <motion.div style={{ x }} className="flex flex-col whitespace-nowrap">
          <motion.h2
            className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {heading}
          </motion.h2>
          {subheading && (
            <motion.p
              className="mt-2 text-lg font-semibold md:text-2xl lg:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subheading}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VelocityScroll;