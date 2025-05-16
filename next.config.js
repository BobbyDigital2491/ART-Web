/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "via.placeholder.com",
        },
        {
          protocol: "https",
          hostname: "peach-informal-llama-875.mypinata.cloud",
        },
        {
          protocol: "https",
          hostname: "assets.aceternity.com",
        },
        {
          protocol: "https",
          hostname: "img1.wsimg.com",
        },
        {
          protocol: "https",
          hostname: "wallpapers.com",
        },
        {
          protocol: "https",
          hostname : "images.squarespace-cdn.com",
        },
        {
          protocol: "https",
          hostname: "s3.amazonaws.com",
        },
        {
          protocol: "https",
          hostname: "tailwindcss.com",
        },
        {
          protocol: "https",
          hostname: "tailwindui.com",
        },
        {
          protocol: "https",
          hostname: "img.freepik.com",
        },
        {
          protocol: "https",
          hostname: "scontent-lga3-2.xx.fbcdn.net",
        }

      ],
    },
  };
  
  module.exports = nextConfig;