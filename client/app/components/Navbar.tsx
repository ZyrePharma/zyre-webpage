'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Products', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Posts', href: '/posts' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFirst, setShowFirst] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mouseTimeout, setMouseTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down and not at the top
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Handle mouse movement
  const handleMouseMove = useCallback(() => {
    // Clear existing timeout
    if (mouseTimeout) {
      clearTimeout(mouseTimeout);
    }

    // Show navbar when mouse moves at the top of the page
    if (window.scrollY < 100) {
      setIsVisible(true);
    }

    // Set timeout to hide navbar after mouse stops moving
    const timeout = setTimeout(() => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      }
    }, 2000);

    setMouseTimeout(timeout);
  }, [mouseTimeout]);

  useEffect(() => {
    // Toggle between texts every 4 seconds for smoother transitions
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 4000);

    // Add scroll and mouse event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }
    };
  }, [handleScroll, handleMouseMove, mouseTimeout]);

  // Text animation variants - Ultra smooth 3D flip effect
  const textVariants = {
    initial: {
      rotateY: 85,
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        rotateY: {
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        },
        opacity: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2,
        },
        scale: {
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
    exit: {
      rotateY: -85,
      opacity: 0,
      scale: 0.95,
      transition: {
        rotateY: {
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        },
        opacity: {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        },
        scale: {
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
  };

  // Link animation variants for mobile menu
  const mobileLinkVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className="w-full shadow-md fixed top-0 left-0 transparent backdrop-blur z-50"
    >
      <div className="flex justify-between items-center h-[100px] sm:h-[110px] md:h-[120px] px-4 sm:px-6 md:px-8 lg:px-12 relative">
        {/* Inquiry Banner */}
        <div className="absolute top-0 right-0 bg-primary py-1 px-8 rounded-bl-full hidden md:block">
          <span className="text-white text-xs">
            For Inquiries, contact us here: info@zyrepharma.com
          </span>
        </div>

        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link href="/">
            <Image
              src="/assets/zyre-logo.png"
              alt="zyre-logo"
              width={50}
              height={50}
              className="cursor-pointer sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px]"
            />
          </Link>
          <div className="relative h-10 sm:h-11 md:h-12 flex flex-col justify-center perspective-1000">
            <AnimatePresence mode="wait">
              {showFirst ? (
                <motion.span
                  key="company-name"
                  className="text-primary text-[10px] sm:text-xs font-bold block absolute"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={textVariants}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  Zyre Pharmaceuticals Corporation
                </motion.span>
              ) : (
                <motion.span
                  key="tagline"
                  className="text-zyre-red text-[10px] sm:text-xs font-semibold block absolute"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={textVariants}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  Because Life Matters
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-4 xl:gap-5">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="relative"
              >
                <Link href={link.href} prefetch={true}>
                  <motion.div
                    className="relative px-6 py-3 cursor-pointer overflow-visible"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {/* Active pill background with glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                        duration: 0.5,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary rounded-full shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-br from-zyre-red/20 to-transparent rounded-full blur-sm" />
                    </motion.div>

                    {/* Hover pill background */}
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />

                    <span
                      className={`relative z-10 text-base xl:text-lg font-bold transition-colors duration-300 ${isActive ? 'text-white drop-shadow-sm' : 'text-primary'
                        }`}
                    >
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Tablet Nav */}
        <ul className="hidden md:flex lg:hidden gap-3">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                className="relative"
              >
                <Link href={link.href} prefetch={true}>
                  <motion.div
                    className="relative px-4 py-2.5 cursor-pointer overflow-visible"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {/* Active pill background with glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                        duration: 0.5,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary rounded-full shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-br from-zyre-red/20 to-transparent rounded-full blur-sm" />
                    </motion.div>

                    {/* Hover pill background */}
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />

                    <span
                      className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-white drop-shadow-sm' : 'text-primary'
                        }`}
                    >
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden z-50">
          <motion.div
            key={isOpen ? 'close' : 'menu'}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 180, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {isOpen ? (
              <AiOutlineClose className="text-3xl text-primary" />
            ) : (
              <AiOutlineMenu className="text-3xl text-primary" />
            )}
          </motion.div>
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="fixed top-0 right-0 w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-screen bg-white/95 backdrop-blur-md shadow-2xl flex flex-col items-center py-20 z-40 border-l border-gray-200"
            >
              <ul className="flex flex-col items-center space-y-8 w-full px-6">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={index}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={mobileLinkVariants}
                      onClick={() => setIsOpen(false)}
                      className="w-full max-w-xs"
                    >
                      <Link href={link.href} prefetch={true}>
                        <motion.div
                          className="relative px-6 py-3.5 rounded-full cursor-pointer overflow-visible group"
                          whileTap={{ scale: 0.96 }}
                          whileHover={{ scale: 1.02 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          {/* Active pill background with glow */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            initial={false}
                            animate={{
                              scale: isActive ? 1 : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 25,
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary rounded-full shadow-lg shadow-primary/30" />
                          </motion.div>

                          {/* Hover background effect */}
                          <motion.div
                            className="absolute inset-0 bg-primary/10 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />

                          <span
                            className={`relative z-10 text-lg font-semibold text-center block transition-colors duration-300 ${isActive
                              ? 'text-white drop-shadow-md'
                              : 'text-primary group-hover:text-primary'
                              }`}
                          >
                            {link.label}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 px-4 py-3 bg-primary/90 backdrop-blur-sm rounded-lg w-full max-w-xs text-center shadow-lg"
              >
                <span className="text-white text-sm font-medium">
                  For Inquiries: info@zyrepharma.com
                </span>
              </motion.div>
            </motion.div>

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 cursor-pointer"
            />
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
