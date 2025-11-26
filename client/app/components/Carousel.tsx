'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
  { src: '/assets/img1.jpg', alt: 'img1' },
  { src: '/assets/img2.jpg', alt: 'img2' },
  { src: '/assets/img3.jpg', alt: 'img3' },
  { src: '/assets/img4.jpg', alt: 'img4' },
  { src: '/assets/img5.jpg', alt: 'img5' },
];

const Carousel = () => {
  const [activeIndices, setActiveIndices] = useState([0, 1, 2, 3, 4]);
  const [animating, setAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Initial window width setup
    setWindowWidth(window.innerWidth);
    setIsMounted(true);

    // Window resize event listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setActiveIndices((prev) => prev.map((idx) => (idx + 1) % images.length));
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  const handlePrev = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setActiveIndices((prev) =>
      prev.map((idx) => (idx - 1 + images.length) % images.length)
    );
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (!animating) handleNext();
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [animating, handleNext]);

  // Calculate responsive values based on screen width
  const getResponsiveValues = () => {
    // Use default mobile values if not mounted yet (SSR)
    const width = windowWidth ?? 0;

    // Defaults for mobile
    let positions = {
      center: 0,
      leftMiddle: -150,
      rightMiddle: 150,
      leftOuter: -250,
      rightOuter: 250,
    };

    let imageWidth = '75vw';
    let imageMaxWidth = '280px';

    // Tablet
    if (width >= 640) {
      positions = {
        center: 0,
        leftMiddle: -220,
        rightMiddle: 220,
        leftOuter: -380,
        rightOuter: 380,
      };
      imageWidth = '65vw';
      imageMaxWidth = '320px';
    }

    // Desktop
    if (width >= 1024) {
      positions = {
        center: 0,
        leftMiddle: -320,
        rightMiddle: 320,
        leftOuter: -550,
        rightOuter: 550,
      };
      imageWidth = '60vw';
      imageMaxWidth = '360px';
    }

    return { positions, imageWidth, imageMaxWidth };
  };

  const { positions, imageWidth, imageMaxWidth } = getResponsiveValues();

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="relative w-full h-screen bg-white py-8 md:py-12 lg:py-16 overflow-hidden">
        <div className="text-center mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2 md:mb-4">
            <span className="text-primary">FROM </span>
            <span className="text-[var(--color-zyre-red)] font-script">
              Bicol{' '}
            </span>
            <span className="text-primary">TO NATIONWIDE COVERAGE</span>
          </h2>
          <p className="text-gray-700 text-xs md:text-sm lg:text-lg">
            Providing high-quality pharmaceutical solutions nationwide.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-white py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="text-center mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2 md:mb-4">
          <span className="text-primary">FROM </span>
          <span className="text-[var(--color-zyre-red)] font-script">
            Bicol{' '}
          </span>
          <span className="text-primary">TO NATIONWIDE COVERAGE</span>
        </h2>
        <p className="text-gray-700 text-xs md:text-sm lg:text-lg">
          Providing high-quality pharmaceutical solutions nationwide.
        </p>
      </div>

      <div className="relative mx-auto">
        <div className="relative h-48 sm:h-60 md:h-72 lg:h-[420px]">
          <AnimatePresence initial={false}>
            {activeIndices.map((imageIndex, displayIndex) => {
              let xPosition;

              // Position based on display index and screen size
              if (displayIndex === 2) {
                xPosition = positions.center;
              } else if (displayIndex === 1) {
                xPosition = positions.leftMiddle;
              } else if (displayIndex === 3) {
                xPosition = positions.rightMiddle;
              } else if (displayIndex === 0) {
                xPosition = positions.leftOuter;
              } else {
                xPosition = positions.rightOuter;
              }

              // Z-index hierarchy
              let zIndex;
              if (displayIndex === 2) {
                zIndex = 30;
              } else if (displayIndex === 1 || displayIndex === 3) {
                zIndex = 20;
              } else {
                zIndex = 5;
              }

              // Scale based on position
              const scale = 1 - Math.abs(displayIndex - 2) * 0.07;

              // Opacity
              const opacity =
                displayIndex === 0 || displayIndex === 4 ? 0.5 : 1;

              // Adjust height for background images
              let height = '100%';
              if (displayIndex === 0 || displayIndex === 4) {
                height = '85%';
              }

              return (
                <motion.div
                  key={`${imageIndex}-${displayIndex}`}
                  className="absolute top-0 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                  style={{
                    width: imageWidth,
                    maxWidth: imageMaxWidth,
                    height,
                    // Center vertically for back images
                    top:
                      displayIndex === 0 || displayIndex === 4 ? '7.5%' : '0%',
                    left: '50%',
                    zIndex,
                  }}
                  initial={{ opacity: 0, x: xPosition < 0 ? -500 : 500, scale }}
                  animate={{ opacity, x: `calc(${xPosition}px - 50%)`, scale }}
                  exit={{ opacity: 0, x: xPosition < 0 ? -500 : 500, scale }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    duration: 0.7,
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={images[imageIndex].src}
                      alt={images[imageIndex].alt}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between px-4">
          <button
            onClick={handlePrev}
            disabled={animating}
            className="bg-white p-2 md:p-3 rounded-full shadow-md z-40 transition-all disabled:opacity-50"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            disabled={animating}
            className="bg-white p-2 md:p-3 rounded-full shadow-md z-40 transition-all disabled:opacity-50"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
