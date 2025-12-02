'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface CompanyGalleryImage {
    id: number;
    src: string;
    alt: string;
    title: string;
}

interface GalleryCollection {
    id: number;
    title: string;
    description?: string;
    images: CompanyGalleryImage[];
}

interface CompanyGalleryProps {
    galleries?: GalleryCollection[];
}

// Default fallback galleries
const defaultGalleries: GalleryCollection[] = [
    {
        id: 1,
        title: 'Manufacturing Facility',
        images: [
            {
                id: 1,
                src: '/assets/img1.jpg',
                alt: 'Zyre Pharmaceuticals Manufacturing Facility',
                title: 'State-of-the-art Manufacturing Facility',
            },
        ],
    },
    {
        id: 2,
        title: 'Research & Development',
        images: [
            {
                id: 2,
                src: '/assets/img2.jpg',
                alt: 'Research and Development Laboratory',
                title: 'Advanced R&D Laboratory',
            },
        ],
    },
    {
        id: 3,
        title: 'Quality Control',
        images: [
            {
                id: 3,
                src: '/assets/img3.jpg',
                alt: 'Quality Control Department',
                title: 'Quality Control & Testing',
            },
        ],
    },
    {
        id: 4,
        title: 'Team Collaboration',
        images: [
            {
                id: 4,
                src: '/assets/img4.jpg',
                alt: 'Team Collaboration Meeting',
                title: 'Expert Team Collaboration',
            },
        ],
    },
    {
        id: 5,
        title: 'Distribution Network',
        images: [
            {
                id: 5,
                src: '/assets/img5.jpg',
                alt: 'Global Distribution Network',
                title: 'Worldwide Distribution',
            },
        ],
    },
    {
        id: 6,
        title: 'Pharmaceutical Products',
        images: [
            {
                id: 6,
                src: '/assets/Med1.png',
                alt: 'Pharmaceutical Products',
                title: 'Our Pharmaceutical Products',
            },
        ],
    },
    {
        id: 7,
        title: 'Medical Equipment',
        images: [
            {
                id: 7,
                src: '/assets/Med2.png',
                alt: 'Medical Equipment',
                title: 'Advanced Medical Equipment',
            },
        ],
    },
    {
        id: 8,
        title: 'Healthcare Solutions',
        images: [
            {
                id: 8,
                src: '/assets/Med3.png',
                alt: 'Healthcare Solutions',
                title: 'Comprehensive Healthcare Solutions',
            },
        ],
    },
];

const CompanyGallery = ({ galleries }: CompanyGalleryProps) => {
    const [selectedGallery, setSelectedGallery] = useState<GalleryCollection | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Use provided galleries or fallback to default
    const companyGalleries = galleries && galleries.length > 0 ? galleries : defaultGalleries;

    // Dynamic grid span class based on total count and index
    const getGridSpanClass = (index: number, total: number): string => {
        // For 1 item: full width, tall
        if (total === 1) {
            return "md:col-span-4 md:row-span-3";
        }

        // For 2 items: split evenly
        if (total === 2) {
            return "md:col-span-2 md:row-span-2";
        }

        // For 3 items: first large, others medium
        if (total === 3) {
            if (index === 0) return "md:col-span-2 md:row-span-2";
            return "md:col-span-2 md:row-span-1";
        }

        // For 4 items: 2x2 grid
        if (total === 4) {
            return "md:col-span-2 md:row-span-1";
        }

        // For 5 items: featured first, then 2x2
        if (total === 5) {
            if (index === 0) return "md:col-span-2 md:row-span-2";
            return "md:col-span-1 md:row-span-1";
        }

        // For 6 items: 2 large, 4 small
        if (total === 6) {
            if (index === 0 || index === 5) return "md:col-span-2 md:row-span-2";
            return "md:col-span-1 md:row-span-1";
        }

        // For 7 items: varied layout
        if (total === 7) {
            if (index === 0) return "md:col-span-2 md:row-span-2";
            if (index === 3) return "md:col-span-2 md:row-span-1";
            if (index === 6) return "md:col-span-2 md:row-span-1";
            return "md:col-span-1 md:row-span-1";
        }

        // For 8+ items: Bento Grid pattern (original design)
        if (index === 0) return "md:col-span-2 md:row-span-2";
        if (index === 3) return "md:col-span-2 md:row-span-1";
        if (index === 4) return "md:col-span-1 md:row-span-2";
        if (index === 6) return "md:col-span-2 md:row-span-2";
        return "md:col-span-1 md:row-span-1";
    };

    const openGallery = (gallery: GalleryCollection) => {
        setSelectedGallery(gallery);
        setCurrentImageIndex(0);
    };

    const closeGallery = () => {
        setSelectedGallery(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedGallery) {
            setCurrentImageIndex((prev) =>
                prev === selectedGallery.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedGallery) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedGallery.images.length - 1 : prev - 1
            );
        }
    };

    return (
        <>
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-gray-900 mb-4"
                        >
                            Our Company in Pictures
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-600 max-w-3xl mx-auto"
                        >
                            Take a visual journey through our state-of-the-art facilities,
                            dedicated team, and commitment to pharmaceutical excellence.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] gap-4 grid-flow-dense">
                        {companyGalleries.map((gallery, index) => {
                            // Get dynamic span class based on total count
                            const spanClass = getGridSpanClass(index, companyGalleries.length);

                            // Get first image as thumbnail
                            const thumbnail = gallery.images[0];

                            return (
                                <motion.div
                                    key={gallery.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => openGallery(gallery)}
                                    className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg ${spanClass}`}
                                >
                                    <Image
                                        src={thumbnail.src}
                                        alt={thumbnail.alt}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-white font-bold text-lg mb-1">
                                                {gallery.title}
                                            </h3>
                                            <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                {gallery.images.length} {gallery.images.length === 1 ? 'image' : 'images'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-secondary transition-colors shadow-lg hover:shadow-xl"
                        >
                            View Full Gallery
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedGallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={closeGallery}
                    >
                        <button
                            onClick={closeGallery}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                            aria-label="Close gallery"
                        >
                            <FaTimes size={32} />
                        </button>

                        <div
                            className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Current Image */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={selectedGallery.images[currentImageIndex].src}
                                            alt={selectedGallery.images[currentImageIndex].alt}
                                            fill
                                            className="object-contain"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Navigation Arrows */}
                            {selectedGallery.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-colors backdrop-blur-sm"
                                        aria-label="Previous image"
                                    >
                                        <FaChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-colors backdrop-blur-sm"
                                        aria-label="Next image"
                                    >
                                        <FaChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            {/* Image Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                                <h3 className="text-2xl font-bold mb-2">{selectedGallery.title}</h3>
                                <p className="text-sm text-gray-300 mb-2">
                                    {selectedGallery.images[currentImageIndex].title}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Image {currentImageIndex + 1} of {selectedGallery.images.length}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CompanyGallery;
