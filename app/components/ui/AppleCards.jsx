"use client";

import Image from "next/image";
import React from "react";
import { Carousel, Card } from "./apple-cards-carousel";

const AppleCards = () => {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full py-20 bg-black">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans">
        Discover ARt Emerged
      </h2>
      <Carousel items={cards} />
    </div>
  );
};

const DummyContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700">
                ARt Emerged brings fashion to life.
              </span>{" "}
              Explore our augmented reality apparel, designed for style and
              durability. Experience the future of clothing today.
            </p>
            <Image
              src="https://img1.wsimg.com/isteam/ip/67f024bd-8725-4051-8f8c-647aad4b7d78/ols/IMG_2857.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const DummyContent1 = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700">
                ARt Emerged brings fashion to life.
              </span>{" "}
              Explore our augmented reality apparel, designed for style and
              durability. Experience the future of clothing today.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const DummyContent2 = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700">
                ARt Emerged brings fashion to life.
              </span>{" "}
              Explore our augmented reality apparel, designed for style and
              durability. Experience the future of clothing today.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Augmented Reality",
    title: "Wear the Future with AR.",
    src: "https://img1.wsimg.com/isteam/ip/67f024bd-8725-4051-8f8c-647aad4b7d78/ols/IMG_2857.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true",
    content: <DummyContent />,
  },
  {
    category: "Style",
    title: "Elevate Your Wardrobe.",
    src: "https://peach-informal-llama-875.mypinata.cloud/ipfs/bafybeigzf6vg6cjkv4e52czwgacp26ntvhm2qb7u7r3xbrhinxavgd3qou",
    content: <DummyContent1 />,
  },
  {
    category: "Collection",
    title: "New Summer AR Line.",
    src: "https://peach-informal-llama-875.mypinata.cloud/ipfs/bafybeigzf6vg6cjkv4e52czwgacp26ntvhm2qb7u7r3xbrhinxavgd3qou",
    content: <DummyContent2 />,
  },
  {
    category: "Design",
    title: "Innovative AR Fashion.",
    src: "https://peach-informal-llama-875.mypinata.cloud/ipfs/bafybeigzf6vg6cjkv4e52czwgacp26ntvhm2qb7u7r3xbrhinxavgd3qou",
    content: <DummyContent />,
  },
  {
    category: "Technology",
    title: "AR Enhances Style.",
    src: "https://peach-informal-llama-875.mypinata.cloud/ipfs/bafybeigzf6vg6cjkv4e52czwgacp26ntvhm2qb7u7r3xbrhinxavgd3qou",
    content: <DummyContent />,
  },
  {
    category: "Experience",
    title: "Immerse in AR Clothing.",
    src: "https://peach-informal-llama-875.mypinata.cloud/ipfs/bafybeigzf6vg6cjkv4e52czwgacp26ntvhm2qb7u7r3xbrhinxavgd3qou",
    content: <DummyContent />,
  },
];

export default AppleCards;