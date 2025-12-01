'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Newsletter from '../components/Newsletter';
import About from '../components/About';

interface SisterCompany {
    id: number;
    name: string;
    description: string;
    specialties: string[];
    website?: string;
    logo?: string;
}

interface AboutPageClientProps {
    aboutText: string;
    historyText: string;
    missionText: string;
    visionText: string;
    sisterCompanies: SisterCompany[];
}

const AboutPageClient: React.FC<AboutPageClientProps> = ({
    aboutText,
    historyText,
    missionText,
    visionText,
    sisterCompanies,
}) => {
    const cardVariants = {
        initial: { opacity: 0, y: 50 },
        animate: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: i * 0.2,
                ease: 'easeOut',
            },
        }),
        hover: {
            y: -10,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    };

    const iconVariants = {
        initial: { scale: 0, rotate: -180 },
        animate: (i: number) => ({
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.5,
                delay: i * 0.2 + 0.2,
                ease: 'easeOut',
            },
        }),
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: {
                duration: 0.3,
            },
        },
    };

    // Parse history text into paragraphs (split by periods followed by space and capital letter)
    const historyParagraphs = historyText
        .split(/(?<=\.) (?=[A-Z])/)
        .filter(p => p.trim().length > 0);

    return (
        <>
            {/* Company Information Section */}
            <div className="w-full bg-gradient-to-br from-primary/5 via-white to-[var(--color-blue-50)] py-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-primary"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-6">
                            <span className="text-primary">About </span>
                            <span className="text-[var(--color-zyre-red)]">
                                Zyre Pharmaceuticals
                            </span>
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-[var(--color-zyre-red)] mb-8"></div>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            {aboutText}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* About component with Mission, Vision, and Timeline */}
            <About mission={missionText} vision={visionText} />

            {/* Company History Section */}
            <div className="w-full bg-gradient-to-br from-white via-[var(--color-blue-50)] to-primary/5 py-24 md:py-32 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-primary">Our </span>
                            <span className="text-[var(--color-zyre-red)]">History</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-[var(--color-zyre-red)] mx-auto"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-l-4 border-[var(--color-zyre-red)] relative overflow-hidden"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-[var(--color-zyre-red)]/5 rounded-full blur-3xl -z-0"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[var(--color-zyre-red)]/5 to-primary/5 rounded-full blur-3xl -z-0"></div>

                        <div className="relative z-10 space-y-6">
                            {historyParagraphs.length > 0 ? (
                                historyParagraphs.map((paragraph, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                        className="text-lg md:text-xl text-gray-700 leading-relaxed"
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="text-lg md:text-xl text-gray-700 leading-relaxed"
                                >
                                    {historyText}
                                </motion.p>
                            )}

                            {/* Decorative bottom accent */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="w-full h-1 bg-gradient-to-r from-primary via-[var(--color-zyre-red)] to-primary mt-8 origin-left"
                            ></motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Our Sister Companies Section */}
            <div className="w-full min-h-screen bg-gradient-to-b from-[var(--color-blue-50)] to-white py-16 px-4 md:px-8">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-primary">Our Sister </span>
                            <span className="text-[var(--color-zyre-red)]">Companies</span>
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-[var(--color-zyre-red)] mx-auto mb-6"></div>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Part of a family of pharmaceutical companies dedicated to
                            improving healthcare outcomes through innovation, collaboration,
                            and excellence.
                        </p>
                    </motion.div>
                </div>

                {/* Companies Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sisterCompanies.map((company, index) => (
                        <motion.div
                            key={company.id}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            custom={index}
                            whileHover="hover"
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-primary group cursor-pointer relative flex flex-col h-full"
                        >
                            {/* Decorative Top Bar */}
                            <div className="h-2 bg-gradient-to-r from-primary via-[var(--color-zyre-red)] to-primary"></div>

                            {/* Content */}
                            <div className="p-8 flex flex-col h-full flex-1">
                                {/* Logo */}
                                <motion.div
                                    variants={iconVariants}
                                    initial="initial"
                                    animate="animate"
                                    custom={index}
                                    whileHover="hover"
                                    className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg overflow-hidden border-2 border-primary/20"
                                >
                                    {company.logo ? (
                                        <Image
                                            src={company.logo}
                                            alt={`${company.name} logo`}
                                            width={120}
                                            height={120}
                                            className="w-full h-full object-contain p-3"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary to-[var(--color-zyre-red)] flex items-center justify-center text-white text-3xl font-bold">
                                            {company.name.charAt(0)}
                                        </div>
                                    )}
                                </motion.div>

                                {/* Company Name */}
                                <h3 className="text-2xl font-bold text-primary text-center mb-4">
                                    {company.name}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                                    {company.description}
                                </p>

                                {/* Specialties */}
                                <div className="flex flex-wrap gap-2 justify-center mb-6">
                                    {company.specialties.map((specialty, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>

                                {/* Website Link */}
                                {company.website && (
                                    <motion.a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full mt-auto py-3 bg-primary text-white text-center rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Visit Website
                                    </motion.a>
                                )}
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[var(--color-zyre-red)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="max-w-4xl mx-auto mt-20 text-center"
                >
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border-t-4 border-[var(--color-zyre-red)]">
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            Together We Make a Difference
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Through our interconnected network of sister companies, we
                            synergize our expertise, resources, and passion to create a
                            comprehensive healthcare ecosystem that delivers exceptional value
                            to patients, healthcare providers, and communities worldwide.
                        </p>
                    </div>
                </motion.div>

                {/* Newsletter Section */}
                <div className="max-w-4xl mx-auto mt-20 px-4">
                    <Newsletter />
                </div>
            </div>
        </>
    );
};

export default AboutPageClient;
