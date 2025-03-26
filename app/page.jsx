"use client";

import React from "react";
import AppleCards from "./components/ui/AppleCards";
import Hero1 from "./components/ui/Hero1";
import MagicText1 from "./components/ui/MagicText1";


export default function Page() {
  return (
    <div>
      <Hero1/>
      <div className="bg-black dark:bg-gray-900 flex items-center justify-center">
        <MagicText1
          words="Augmented reality for the future"
          className="text-9xl text-center"
        />
      </div>
      
      <AppleCards />
    </div>
  );
}