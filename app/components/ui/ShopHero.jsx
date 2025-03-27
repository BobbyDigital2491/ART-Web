"use client";

import React, { useEffect, useRef, useState } from "react";

const ShopHero = () => {
  const lightboxRef = useRef(null);
  const closeRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0); // Track the active main image
  const [lightboxSrc, setLightboxSrc] = useState(null); // Track lightbox image source

  const images = [
    "https://pagedone.io/asset/uploads/1713943683.png",
    "https://pagedone.io/asset/uploads/1713943709.png",
    "https://pagedone.io/asset/uploads/1713943720.png",
    "https://pagedone.io/asset/uploads/1713943731.png",
  ];

  useEffect(() => {
    const lightbox = lightboxRef.current;
    const closeButton = closeRef.current;
    const gallery = document.querySelector(".gallery");

    const handleGalleryClick = (e) => {
      if (e.target.classList.contains("gallery-image")) {
        const imageSrc = e.target.src;
        setLightboxSrc(imageSrc);
        lightbox.style.display = "flex";
      }
    };

    const handleCloseClick = () => {
      lightbox.style.display = "none";
      setLightboxSrc(null); // Reset source when closing
    };

    const handleOutsideClick = (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        setLightboxSrc(null); // Reset source when closing
      }
    };

    gallery.addEventListener("click", handleGalleryClick);
    closeButton.addEventListener("click", handleCloseClick);
    lightbox.addEventListener("click", handleOutsideClick);

    return () => {
      gallery.removeEventListener("click", handleGalleryClick);
      closeButton.removeEventListener("click", handleCloseClick);
      lightbox.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .gallery {
          width: 90vw;
          max-width: 1200px;
          margin: 0 auto;
        }
        .gallery img {
          max-width: 100%;
          cursor: pointer;
        }
        .gallery img:hover {
          max-width: 100%;
          cursor: pointer;
        }
        .thumbnail {
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 28px;
          transition: border-color 0.5s;
        }
        .thumbnail:hover,
        .thumbnail.active {
          border-color: rgb(79, 70, 229);
        }
        .lightbox {
          display: none;
          position: fixed;
          z-index: 999;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: rgba(0, 0, 0, 0.8);
        }
        .lightbox-image {
          display: block;
          margin: auto;
          max-width: 100%;
          max-height: 100%;
        }
        .close {
          color: #fff;
          font-size: 3em;
          position: absolute;
          top: 20px;
          right: 30px;
          cursor: pointer;
        }
      `}</style>

      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
          <div className="mb-16">
            <h2 className="w-full text-center text-white text-6xl font-bold font-manrope leading-normal pb-2.5 dark:text-white">
              ARt Emerged Shop
            </h2>
            <p className="w-full text-center text-gray-600 text-lg font-normal leading-8 dark:text-gray-300">
              Explore the essence of beauty in our gallery's intimate space.
            </p>
          </div>
          <div className="flex flex-col-reverse gap-8 mx-auto">
            <div className="slider-box flex flex-col xl:flex-row gap-8">
              <div className="box xl:w-[1062px] w-full gallery">
                <div className="relative">
                  <div className="block xl:w-[1062px] w-full mx-auto h-[627px] rounded-3xl">
                    <img
                      src={images[activeImage]}
                      alt="Gallery image"
                      className="gallery-image w-full h-full mx-auto rounded-3xl object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="xl:w-[126px] w-full">
                <div className="flex xl:flex-col justify-center md:gap-7 gap-4">
                  {images.map((src, index) => (
                    <div
                      key={index}
                      className={`thumbs-slide lg:!w-[126px] md:!h-[135px] w-full h-[110px] ${
                        activeImage === index ? "active" : ""
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={src}
                        alt="Gallery thumbnail"
                        className="thumbnail w-full h-full rounded-2xl object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lightbox" id="lightbox" ref={lightboxRef}>
            <span className="close" id="close" ref={closeRef}>
              ×
            </span>
            {lightboxSrc && (
              <img
                src={lightboxSrc}
                alt="Lightbox image"
                className="lightbox-image"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopHero;