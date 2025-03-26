"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProductHero = ({
  headline = "Discover Our Latest Collection",
  description = "Explore premium products designed for style and durability.",
  products = [],
}) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  const handleClick = (product) => {
    setLastSelected(selected);
    setSelected(product);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  // Filter to show only the first product on mobile
  const displayedProducts = typeof window !== "undefined" && window.innerWidth < 768 ? [products[0]] : products;

  return (
    <div className="w-full bg-black text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Side: Headline and Description */}
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
            >
              {headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300"
            >
              {description}
            </motion.p>
          </div>

          {/* Right Side: Product Grid */}
          <div className="w-full lg:w-2/3 p-10 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {displayedProducts.map((product, i) => (
              <div key={i} className={cn(product.className, "")}>
                <motion.div
                  onClick={() => handleClick(product)}
                  className={cn(
                    "relative overflow-hidden",
                    selected?.id === product.id
                      ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                      : lastSelected?.id === product.id
                      ? "z-40 bg-white rounded-xl h-full w-full"
                      : "bg-white rounded-xl h-full w-full"
                  )}
                  layoutId={`card-${product.id}`}
                >
                  {selected?.id === product.id && <SelectedCard selected={selected} />}
                  <ImageComponent product={product} />
                </motion.div>
              </div>
            ))}
            <motion.div
              onClick={handleOutsideClick}
              className={cn(
                "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
                selected?.id ? "pointer-events-auto" : "pointer-events-none"
              )}
              animate={{ opacity: selected?.id ? 0.3 : 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ImageComponent for Product Thumbnails
const ImageComponent = ({ product }) => {
  return (
    <motion.div
      layoutId={`image-${product.id}-image`}
      className="relative h-64 w-full"
    >
      <Image
        src={product.thumbnail || "https://peach-informal-llama-875.mypinata.cloud/ipfs/bafkreibzmf5ne7qlcojgozkkcno6nzrd4kh2yzp5dtnfezcp4336trbhsm"}
        alt={product.title || "Product Image"}
        fill
        className="object-cover object-top rounded-lg transition duration-200"
      />
    </motion.div>
  );
};

// SelectedCard for Expanded View
const SelectedCard = ({ selected }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-black z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70] text-white"
      >
        <h3 className="text-xl font-bold">{selected.title}</h3>
        <p>{selected.description}</p>
      </motion.div>
    </div>
  );
};

export default ProductHero;