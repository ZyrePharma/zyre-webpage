'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const homeLinks = [
  { label: 'Mission', href: '#mission' },
  { label: 'Vision', href: '#vision' },
  { label: 'History', href: '#history' },
];

const defaultSlides = [
  {
    id: 1,
    image: '/assets/banner6.jpg',
    title: '100% Filipino-owned',
    description:
      'Pharmaceutical importing and marketing company of superior quality hospital-based injectable products, specialty drugs and medicines.',
  },
  {
    id: 2,
    image: '/assets/banner1.jpg',
    title: 'Superior Quality Medicines',
    description:
      'Committed to providing high-quality and affordable medicines across the country.',
  },
  {
    id: 3,
    image: '/assets/banner2.jpg',
    title: 'Trusted Healthcare Partner',
    description:
      'Bringing innovative pharmaceutical solutions for better health outcomes.',
  },
  {
    id: 4,
    image: '/assets/banner3.jpg',
    title: 'Innovative Medical Solutions',
    description:
      'Partnering with global pharmaceutical companies to bring the best solutions to the Philippines.',
  },
  {
    id: 5,
    image: '/assets/banner4.jpg',
    title: 'Innovative Medical Solutions',
    description:
      'Partnering with global pharmaceutical companies to bring the best solutions to the Philippines.',
  },
  {
    id: 6,
    image: '/assets/banner5.jpg',
    title: 'Innovative Medical Solutions',
    description:
      'Partnering with global pharmaceutical companies to bring the best solutions to the Philippines.',
  },
];

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface HeroPageProps {
  slides?: HeroSlide[];
}

const HeroPage = ({ slides: propSlides }: HeroPageProps) => {
  const slides = propSlides && propSlides.length > 0 ? propSlides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      const navbarHeight = 120; // Approximate navbar height
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className=" h-screen w-full flex flex-col bg-white overflow-hidden">
      {/* Top quick nav */}
      <div className="w-full bg-primary py-3 px-6">
        <ul className="flex flex-wrap gap-4 text-white text-sm md:text-base">
          {homeLinks.map((link, index) => (
            <li key={index} className="hover:underline transition">
              <Link
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Hero Section */}
      <div className="relative flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[currentIndex].image}
              alt="Hero Slide"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Content */}
        <div className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 text-white max-w-xl p-6 bg-black/40 backdrop-blur-md rounded-md shadow-lg">
          <motion.h2
            className="text-2xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {slides[currentIndex].title}
          </motion.h2>
          <motion.p
            className="mt-2 text-sm md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {slides[currentIndex].description}
          </motion.p>
          <motion.button
            className="mt-4 px-5 py-2 bg-primary hover:bg-[var(--color-blue-900)] transition rounded text-white text-sm md:text-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            Read More
          </motion.button>
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-gray-400'
                }`}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
