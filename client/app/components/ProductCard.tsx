'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardProps } from '../types';
import {
  ANIMATION_DELAYS,
  ANIMATION_DURATIONS,
  PRODUCT_CONFIG,
} from '../constants';

// Memoized component for better performance
const Card: React.FC<{ product: ProductCardProps }> = memo(({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: ANIMATION_DURATIONS.NORMAL },
    },
    hover: {
      scale: 1.02,
      transition: { duration: ANIMATION_DURATIONS.FAST },
    },
    tap: {
      scale: 0.98,
      transition: { duration: ANIMATION_DURATIONS.FAST },
    },
  };

  const badgeVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATIONS.FAST,
        delay: ANIMATION_DELAYS.STAGGER_CHILD,
      },
    },
  };

  const infoVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATIONS.FAST,
        delay: ANIMATION_DELAYS.STAGGER_CHILD * 2,
      },
    },
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  // Truncate description if too long
  const truncatedDescription =
    product.description.length > PRODUCT_CONFIG.MAX_DESCRIPTION_LENGTH
      ? `${product.description.slice(
        0,
        PRODUCT_CONFIG.MAX_DESCRIPTION_LENGTH
      )}...`
      : product.description;

  // Image navigation handlers
  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      aria-label={`View details for ${product.name}`}
    >
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        className="max-w-[280px] w-full shadow-xl bg-white flex flex-col items-center rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 border border-gray-300 border-b-8 border-b-primary"
      >
        <div className="relative w-full h-48 sm:h-56 border border-gray-300 overflow-hidden group">
          {/* Image Carousel */}
          <AnimatePresence initial={false} custom={currentImageIndex}>
            <motion.div
              key={currentImageIndex}
              custom={currentImageIndex}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={PRODUCT_CONFIG.IMAGE_QUALITY}
                priority={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Only show if multiple images */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-primary text-sm" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Next image"
              >
                <FaChevronRight className="text-primary text-sm" />
              </button>

              {/* Image Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleDotClick(e, index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentImageIndex
                      ? 'bg-primary w-4'
                      : 'bg-white/60 hover:bg-white/80'
                      }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Size Badge */}
          <motion.span
            variants={badgeVariants}
            initial="initial"
            animate="animate"
            className="absolute bg-primary z-20 top-0 right-0 text-[10px] text-white px-2 py-0.5 rounded-bl-xl font-medium"
          >
            {product.size}
          </motion.span>

          {/* FDA Approval Badge */}
          {/* <motion.div
            variants={badgeVariants}
            initial="initial"
            animate="animate"
            className="absolute z-20 top-2 left-2 mt-2 px-2 py-0.5 bg-green-400 text-gray-500 text-[10px] rounded-full flex items-center space-x-1 shadow"
          >
            <FaRegStar className="text-yellow-500 text-sm" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase font-medium">
                FDA Approved
              </span>
              <span className="text-[8px] uppercase">{product.fdaId}</span>
            </div>
          </motion.div> */}
        </div>

        <div className="w-full flex flex-col mt-2 px-3 pb-3 h-[120px]">
          <motion.div
            variants={infoVariants}
            initial="initial"
            animate="animate"
            className="flex justify-between items-start h-full"
          >
            <div className="flex flex-col items-start flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold uppercase text-primary truncate w-full h-[24px]">
                {product.name}
              </h3>
              <span className="text-xs uppercase text-[var(--color-zyre-red)] font-semibold h-[18px]">
                {product.genericName}
              </span>
              <p className="text-xs text-primary mt-1 line-clamp-2 h-[32px]">
                {truncatedDescription}
              </p>

            </div>

            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xs text-white bg-primary px-2 py-1 rounded-l-3xl whitespace-nowrap self-start shadow flex-shrink-0 h-fit"
            >
              {product.category}
            </motion.span>
          </motion.div>

          <motion.div
            variants={infoVariants}
            initial="initial"
            animate="animate"
            className="flex justify-center mt-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white bg-primary text-xs font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              Learn more
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
});

Card.displayName = 'ProductCard';

export default Card;
