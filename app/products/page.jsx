"use client";

import React from "react";
import Navbar from "../components/ui/Navbar";
import MagicText from "../components/ui/MagicText";
import Goodies from "../components/ui/Goodies";
import Header from "../components/ui/Header";

import ImageHero from "../components/ui/ImageHero";

const Page = () => {

  const images = [
    "https://img1.wsimg.com/isteam/ip/67f024bd-8725-4051-8f8c-647aad4b7d78/ols/IMG_2857.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true",
    "https://peach-informal-llama-875.mypinata.cloud/ipfs/bafybeigzf6vg6cjkv4e52czwgacp26ntvhm2qb7u7r3xbrhinxavgd3qou",
    "https://peach-informal-llama-875.mypinata.cloud/ipfs/bafkreibzmf5ne7qlcojgozkkcno6nzrd4kh2yzp5dtnfezcp4336trbhsm",
  ];

  return (
    <div className="bg-black">
      <Header />
      <Navbar />
      <ImageHero images={images} autoplay={true} direction="up" className="h-screen">
        <div className="relative z-50 text-white text-center">
          <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
          <p className="text-xl mt-4">Explore our latest collections</p>
        </div>
      </ImageHero>
      <MagicText words="Products" className="text-9xl text-center text-white" />
      <Goodies />
    </div>
  );
};

export default Page;