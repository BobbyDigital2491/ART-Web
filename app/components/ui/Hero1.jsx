"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "./Navbar";
import HeroVideo from "./HeroVideo";

const Hero1 = () => {
  // Navbar Component Logic
  const Navie = () => {
    return (
      <nav className="flex w-full items-center justify-between border-t border-b border-black px-4 py-4 dark:border-neutral-800 bg-black">
        <div className="flex items-center gap-2">
          <a src="/">
          <img
            src="https://img1.wsimg.com/isteam/ip/67f024bd-8725-4051-8f8c-647aad4b7d78/IMG_0053.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200/qt=q:95"
            className="h-10"
          />
          </a>
          <h1 className="text-base font-bold md:text-2xl text-white">ARt Emerged</h1>
        </div>
        <button className="w-24 transform rounded-lg bg-black px-6 py-2 border-2 border-white font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Login
        </button>
      </nav>
    );
  };

  return (
    <div className="relative mx-auto my-2 flex max-w-7xl flex-col items-center justify-center">
      {/* Navbar positioned above everything */}
      <div className="relative z-20 w-full">
        <Navie />
        <Navbar />
      </div>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://peach-informal-llama-875.mypinata.cloud/ipfs/bafybeigddqoxofh54rg6z72o3odkeskzspa3mzd57yu37ypa5mm45jalye"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 h-full w-full bg-black/50 z-0">
        <div className="absolute top-0 left-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        <div className="absolute top-0 right-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="relative z-10 px-4 py-10 md:py-20">
        <h1 className="mx-auto max-w-4xl text-center text-2xl font-bold text-yellow-400 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Augmented Reality for the Future".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-200 dark:text-neutral-200"
        >
          With AR, you can advertise your business in hours, not days. Try our best
          in class, state of the art, cutting edge AR tools to get your website
          up.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-black border-white border-2 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-white dark:hover:bg-gray-200">
            <Link href="/AR">Try Demo</Link>
          </button>
          <button className="w-60 transform rounded-lg border border-slate-200 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Start Trial
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="mt-20 rounded-3xl border border-slate-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-gray-700">
            <HeroVideo />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero1;