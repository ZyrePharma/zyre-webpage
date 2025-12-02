'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Zyre Blog</h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        Insights, Innovation, and Industry Updates
                    </p>
                    <p className="text-lg opacity-80 max-w-3xl mx-auto">
                        Stay informed about the latest developments in pharmaceutical
                        innovation, regulatory updates, and our commitment to improving
                        global health outcomes.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
