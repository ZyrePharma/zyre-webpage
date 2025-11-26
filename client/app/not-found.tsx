'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    {/* 404 Number with Pill Design */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative inline-block mb-8"
                    >
                        <div className="flex items-center justify-center gap-4">
                            {/* Left Pill Half - "4" */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-l-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-2xl"
                            >
                                <span className="text-6xl md:text-7xl font-bold text-white">4</span>
                            </motion.div>

                            {/* Center Pill - "0" */}
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    delay: 0.2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-red to-red-400 flex items-center justify-center shadow-2xl border-4 border-white"
                            >
                                <span className="text-6xl md:text-7xl font-bold text-white">0</span>
                            </motion.div>

                            {/* Right Pill Half - "4" */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    delay: 0.4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-r-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-2xl"
                            >
                                <span className="text-6xl md:text-7xl font-bold text-white">4</span>
                            </motion.div>
                        </div>

                        {/* Floating Pills Animation */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute -top-8 -left-8 w-16 h-8 rounded-full bg-red/20 blur-sm"
                        />
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                delay: 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute -bottom-4 -right-8 w-12 h-6 rounded-full bg-primary/20 blur-sm"
                        />
                    </motion.div>

                    {/* Error Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
                            Page Not Found
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-2">
                            Oops! This prescription seems to be missing.
                        </p>
                        <p className="text-base md:text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                            The page you're looking for might have been moved, deleted, or never existed.
                            Let's get you back to health with our homepage.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            href="/"
                            className="group relative px-8 py-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10">Return to Homepage</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-primary"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>

                        <Link
                            href="/products"
                            className="group relative px-8 py-4 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                        >
                            Browse Our Products
                        </Link>
                    </motion.div>

                    {/* Helpful Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-12 pt-8 border-t border-gray-200"
                    >
                        <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <Link
                                href="/about"
                                className="text-primary hover:text-red hover:underline transition-colors"
                            >
                                About Us
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link
                                href="/products"
                                className="text-primary hover:text-red hover:underline transition-colors"
                            >
                                Products
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link
                                href="/careers"
                                className="text-primary hover:text-red hover:underline transition-colors"
                            >
                                Careers
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link
                                href="/#contact"
                                className="text-primary hover:text-red hover:underline transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>

                    {/* Medical Cross Decoration */}
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="absolute top-10 right-10 w-16 h-16 opacity-10"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-16 bg-primary rounded-full" />
                            <div className="absolute w-16 h-4 bg-primary rounded-full" />
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{
                            rotate: [0, -360],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="absolute bottom-10 left-10 w-20 h-20 opacity-10"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-20 bg-red rounded-full" />
                            <div className="absolute w-20 h-5 bg-red rounded-full" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
