'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ProductCardProps } from '../types';
import {
  ANIMATION_DELAYS,
  ANIMATION_DURATIONS,
  PRODUCT_CONFIG,
} from '../constants';

// Memoized component for better performance
const Card: React.FC<{ product: ProductCardProps }> = memo(({ product }) => {
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

  // Truncate description if too long
  const truncatedDescription =
    product.description.length > PRODUCT_CONFIG.MAX_DESCRIPTION_LENGTH
      ? `${product.description.slice(
        0,
        PRODUCT_CONFIG.MAX_DESCRIPTION_LENGTH
      )}...`
      : product.description;

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
        <div className="relative w-full h-48 sm:h-56 border border-gray-300 overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.name} - ${product.description}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={PRODUCT_CONFIG.IMAGE_QUALITY}
            priority={false}
          />

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
          <motion.div
            variants={badgeVariants}
            initial="initial"
            animate="animate"
            className="absolute z-20 bottom-2 right-2 mt-2 px-2 py-0.5 bg-green-400 text-gray-500 text-[10px] rounded-full flex items-center space-x-1 shadow"
          >
            <FaRegStar className="text-yellow-500 text-sm" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase font-medium">
                FDA Approved
              </span>
              <span className="text-[8px] uppercase">{product.fdaId}</span>
            </div>
          </motion.div>
        </div>

        <div className="w-full flex flex-col mt-2 px-3 pb-3">
          <motion.div
            variants={infoVariants}
            initial="initial"
            animate="animate"
            className="flex justify-between items-start"
          >
            <div className="flex flex-col items-start flex-1 min-w-0">
              <span className="text-xs uppercase text-[var(--color-zyre-red)] font-semibold">
                {product.genericName}
              </span>
              <h3 className="text-base sm:text-lg font-bold uppercase text-primary truncate w-full">
                {product.name}
              </h3>
              <p className="text-xs text-primary mt-1 line-clamp-2">
                {truncatedDescription}
              </p>
              {product.price && (
                <span className="text-base font-bold text-gray-800 mt-2">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xs text-white bg-primary px-2 py-1 rounded-l-3xl whitespace-nowrap self-start shadow flex-shrink-0"
            >
              {product.type}
            </motion.span>
          </motion.div>

          <motion.div
            variants={infoVariants}
            initial="initial"
            animate="animate"
            className="flex justify-end mt-2"
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="text-primary text-xs font-medium underline hover:text-primary/80 transition-colors"
            >
              Read more...
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
});

Card.displayName = 'ProductCard';

export default Card;
