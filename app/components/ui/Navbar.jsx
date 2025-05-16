"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const Navbar = () => {
  const [active, setActive] = useState(null);

  // MenuItem Component Logic (for items with dropdowns)
  const MenuItem = ({ item, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        onMouseEnter={() => {
          setActive(item);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setTimeout(() => {
            if (!isHovered) setActive(null);
          }, 100);
        }}
        onClick={() => setActive(active === item ? null : item)} // Toggle on mobile
        className="relative z-10 flex-1"
      >
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white px-2 py-2 text-center text-sm md:text-base"
        >
          {item}
        </motion.p>
        {(active === item || isHovered) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={transition}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setActive(null);
            }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20 w-[calc(100vw-2rem)] md:w-auto max-w-[90vw] mx-4"
          >
            <motion.div
              transition={transition}
              layoutId="active"
              className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-x-auto border border-black/[0.2] shadow-xl dark:border-slate-800"
            >
              <motion.div layout className="flex flex-col p-4 space-x-4">
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  };

  // ProductItem Component Logic
  const ProductItem = ({ title, description, href, src }) => (
    <Link
      href={href}
      className="flex flex-col space-y-1 p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md min-w-[120px] md:min-w-[180px]"
    >
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl w-20 h-10 md:w-[140px] md:h-[70px]"
      />
      <div>
        <h4 className="text-sm md:text-xl font-bold text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-xs md:text-sm max-w-[6rem] md:max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );

  // HoveredLink Component Logic
  const HoveredLink = ({ children, ...rest }) => (
    <Link
      {...rest}
      className="flex items-center p-2 text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md text-xs md:text-base min-w-[80px]"
    >
      {children}
    </Link>
  );

  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative border border-slate-200 dark:bg-black dark:border-white/[0.2] bg-white shadow-input w-full max-w-4xl mx-auto z-30 my-2 rounded-full"
    >
      <div className="flex flex-row justify-between items-center px-2 py-2">
        {/* Home Link */}
        <Link
          href="/"
          className="text-black dark:text-white px-2 py-2 hover:opacity-[0.9] flex-1 text-center text-sm md:text-base"
        >
          Home
        </Link>

        {/* Menu Items with Dropdowns */}
        <MenuItem item="About">
          <ProductItem
            title="Our Team"
            description="Meet The Founders."
            href="/Team"
            src="https://peach-informal-llama-875.mypinata.cloud/ipfs/QmeMYDS3orN1WcVivaH46S2CjvAFmh7R5DFdkqWYdSqETN"
          />
          <ProductItem
            title="ARt Emerged App"
            description="Native app for iOS & Android devices."
            href="/Art-Emerged-App"
            src="https://wallpapers.com/images/hd/android-apple-xddzdvfueo0kfvj7.jpg"
          />
          <ProductItem
            title="Merchandise"
            description="Check out our limited edition merch "
            href="/products"
            src="https://img1.wsimg.com/isteam/ip/67f024bd-8725-4051-8f8c-647aad4b7d78/ols/IMG_2857.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
          />
          <HoveredLink href="/products">View All</HoveredLink>
        </MenuItem>

        <MenuItem item="Solutions">
          <ProductItem
            title="Solution 1"
            description="Solve your problems"
            href="/solutions/1"
            src="https://img1.wsimg.com/isteam/ip/67f024bd-8725-4051-8f8c-647aad4b7d78/ols/IMG_2857.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
          />
          <HoveredLink href="/solutions">Learn More</HoveredLink>
        </MenuItem>

        <MenuItem item="Resources">
          <HoveredLink href="/docs">Documentation</HoveredLink>
          <HoveredLink href="/blog">Blog</HoveredLink>
        </MenuItem>

        <MenuItem item="Pricing">
          <HoveredLink href="/pricing">View Plans</HoveredLink>
        </MenuItem>
      </div>
    </nav>
  );
};

export default Navbar;