'use client'
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


const ParallaxText = () => {
  return (
    <div className="bg-black">
      <TextParallaxContent
        imgUrl="https://peach-informal-llama-875.mypinata.cloud/ipfs/QmeMYDS3orN1WcVivaH46S2CjvAFmh7R5DFdkqWYdSqETN"
        subheading="ARt Emerged"
        heading="Meet The Founders."
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://peach-informal-llama-875.mypinata.cloud/ipfs/QmUx6g6LpkNzW8mmqJH7NQnkP2ViC6bRXnx6aaHFxGPHpq"
        subheading="The Architect"
        heading="Landen Prather"
      >
        <ExampleContent2 />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/138327123_4089409134408752_976800681428512076_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=MHWAdRz4ED4Q7kNvwGQR6Pj&_nc_oc=AdkPXjMKLTS2irdk1ZdEcA6buN2ybjWlQxxjeGA-M3FBvZsU-t0N2fozFnOMRTDBLOU&_nc_zt=23&_nc_ht=scontent-lga3-2.xx&_nc_gid=uGH4zYlwpQx9XtyIXYsBNg&oh=00_AfIaePJXRPhgfxasnc2hKY9BrlyQymv-SXdoxpPgpg7NoQ&oe=684F18E0"
        subheading="The Visionary"
        heading="Robert Lawrence"
      >
        <ExampleContent3 />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl text-yellow-400">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl ">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl text-yellow-400 font-bold md:col-span-4">
      Founded May 2024
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        ARt Emerged was founded in May of 2024 by artist Landen Prather and software developer Robert Lawrence. 
        This project came together with the idea of merging art and technology to create immersive experiences 
        through storytelling.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      
    </div>
  </div>
);

const ExampleContent2 = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl text-yellow-400 font-bold md:col-span-4">
        From
        <br/><span className="text-white">Atlanta, Georgia</span>
      </h2>
      
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-400 md:text-2xl">
        I am a creator, and it was installed in me before I was born.
        Creating work and sharing it with the world has allowed me to 
        be able to live in my purpose, while being exposed to other talented 
        creators as well. My mission is to spread love, joy and peace through my 
        work while also helping other artists to get the proper respect that their 
        life’s work deserves. There is room for all of us to be successful in our own lanes.
        </p>
        <p className="mb-8 text-xl text-neutral-400 md:text-2xl">
        This is why I pursue this mission everyday. Being “seen” as an artist is one of the greatest rewards.
        </p>
        
      </div>
    </div>
);

const ExampleContent3 = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl text-yellow-400 font-bold md:col-span-4">
        From
        <br/><span className="text-white">Brooklyn, NY</span>
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
          blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima
          maiores voluptate est ut saepe accusantium maxime doloremque nulla
          consectetur possimus.
        </p>
        <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          reiciendis blanditiis aliquam aut fugit sint.
        </p>
        
      </div>
    </div>
);

export default ParallaxText;