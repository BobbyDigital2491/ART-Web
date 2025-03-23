"use client";

import React from "react";
import Hero1 from "./components/ui/Hero1";
import AppleCards from "./components/ui/AppleCards";
import MagicText from "./components/ui/MagicText";

const Page = () => {
  const items = [
    <AppleCards.Card
      key="1"
      card={{
        title: "ARt Emerged App",
        category: "Native App",
        src: "https://wallpapers.com/images/hd/android-apple-xddzdvfueo0kfvj7.jpg",
        content: <p>This is the content for Card 1</p>,
      }}
      index={0}
    />,
    <AppleCards.Card
      key="2"
      card={{
        title: "AR Nexxus hoodie",
        category: "Products",
        src: "https://img1.wsimg.com/isteam/ip/67f024bd-8725-4051-8f8c-647aad4b7d78/ols/IMG_2857.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,h:600,cg:true",
        content: <p>
        <li>Using the ARt Emerged App for iOS, scan this unique piece of wearable art by Landen Prather to experience a ride like no other.</li>

        <li>Hand Signed and numbered</li>
        
        <li>The experience changes over time with the ARt Emerged App</li>
        
        <li>Exclusive Scavenger Event Access with Purchase (Launch in 2025)</li></p>,
      }}
      index={1}
    />,
    <AppleCards.Card
      key="3"
      card={{
        title: "SUPERFINE Art Fare",
        category: "Upcoming Events",
        src: "https://s3.amazonaws.com/squadup_production/users/logos/009/477/528/original/superfine_2024_logo-01.png?1736144093",
        content: <p>This is the content for Card 2</p>,
      }}
      index={2}
    />,
    <AppleCards.Card
      key="4"
      card={{
        title: "Card 2",
        category: "Category 2",
        src: "https://images.squarespace-cdn.com/content/v1/5f24372b913c1925d9880b2e/21fa9eb7-9d8d-4363-aca8-c79c881c11e4/SuperfineSf2024-11.jpg?format=1500w",
        content: <p>This is the content for Card 2</p>,
      }}
      index={3}
    />,
  ];

  return (
    <div>
      <Hero1 />
      <div className=" bg-black dark:bg-gray-900 flex items-center justify-center">
      <MagicText words="Augmented reality for the future" className="text-9xl text-center" />
    </div>
      <AppleCards items={items} />
    </div>
  );
};

export default Page;