"use client";

import React from "react";
import HeroVideoDialog from "./HeroVideoDialog"; // Adjust path if necessary

const HeroVideo = () => {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Yazom2a4Y2x6clX3"
        thumbnailSrc="https://img.freepik.com/premium-photo/black-woman-using-augmented-reality-panel-office-future-work-cloud-computing-ai-network_146482-12784.jpg"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Yazom2a4Y2x6clX3"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
};

export default HeroVideo;