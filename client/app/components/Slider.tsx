'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import Link from 'next/link';

interface SliderProduct {
  id: number;
  documentId?: string;
  brandName: string;
  genericName: string;
  category: string;
  image: string;
  slug?: string;
  formulation?: string[];
  indication?: string[];
  manufacturer?: string;
}


interface SliderProps {
  products?: SliderProduct[];
}

const Slider = ({ products: propProducts }: SliderProps) => {
  const products = propProducts || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentProduct = products[currentIndex];

  const goToNext = () => {
    if (currentIndex < products.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1,
    }),
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white overflow-hidden">
      <div className="flex justify-center mb-12">
        <h1 className="text-3xl font-bold">
          <span className="text-primary">OUR </span>
          <span className="text-[var(--color-zyre-red)]">FEATURED</span>
          <span className="text-primary"> PRODUCTS</span>
        </h1>
      </div>

      <div className="relative w-full max-w-[80%] mx-auto px-4 overflow-hidden min-h-[400px] md:min-h-[450px] flex items-center">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentProduct.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 200, damping: 25 },
              opacity: { duration: 0 },
            }}
            className="w-full border border-gray-400 rounded-lg shadow-md"
          >
            <div className="flex flex-col md:flex-row items-center justify-between md:items-stretch min-h-[350px] md:min-h-[400px]">
              <div className="w-full md:w-5/12 mb-8 md:mb-0">
                <div className="bg-gray-200 rounded-lg overflow-hidden h-96 md:h-full relative">
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.brandName}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                  />
                </div>
              </div>

              <div className="w-full md:w-6/12 relative">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-primary">
                    {currentProduct.brandName}
                  </h2>
                  <p className="text-gray-600">{currentProduct.genericName}</p>
                  <div className="mt-2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
                      {currentProduct.category}
                    </span>
                  </div>
                </div>

                {currentProduct.formulation && currentProduct.formulation.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      FORMULATION
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      {currentProduct.formulation.map((item, index) => (
                        <li key={`form-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentProduct.indication && currentProduct.indication.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      INDICATION
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      {currentProduct.indication.map((item, index) => (
                        <li key={`ind-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6">
                  {currentProduct.slug || currentProduct.documentId ? (
                    <Link
                      href={`/products/${currentProduct.slug || currentProduct.documentId}`}
                      className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-primary transition-colors inline-block"
                    >
                      Read more
                    </Link>
                  ) : (
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-primary transition-colors">
                      Read more
                    </button>
                  )}
                </div>

                {currentProduct.manufacturer && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gray-200 rounded-full h-16 w-16 flex items-center justify-center">
                      <div className="text-xs text-center text-gray-600">
                        <div>Reg of</div>
                        <div>manufacture</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`absolute top-1/2 left-0 z-10 rounded-full w-14 h-14 flex items-center justify-center border border-primary ${currentIndex === 0
            ? 'text-gray-300 border-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-blue-100'
            }`}
          aria-label="Previous product"
        >
          <FaArrowCircleLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goToNext}
          disabled={currentIndex === products.length - 1}
          className={`absolute top-1/2 z-10 right-0 rounded-full w-14 h-14 flex items-center justify-center border border-primary ${currentIndex === products.length - 1
            ? 'text-gray-300 border-gray-300 cursor-not-allowed'
            : 'text-primary hover:bg-blue-100'
            }`}
          aria-label="Next product"
        >
          <FaArrowCircleRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Slider;