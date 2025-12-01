'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHeart, FaShare, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Newsletter from '../../components/Newsletter';
import type { Product } from './page';

interface ProductDetailClientProps {
    product: Product;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [isTableOpen, setIsTableOpen] = useState(false);

    // Generate anchor IDs from labels
    const getAnchorId = (label: string) => {
        return label.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header Navigation */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-6">
                        <Link href="/" className="text-gray-600 hover:text-primary">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-600 hover:text-primary">
                            Products
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/products"
                            className="text-gray-600 hover:text-primary flex items-center space-x-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            <span>Back to Products</span>
                        </Link>
                        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                            ENQUIRE
                        </button>
                    </div>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-primary">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-primary">
                        Products
                    </Link>
                    <span>/</span>
                    <span className="text-gray-800 font-medium">{product.name}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Product Images & Quick Info */}
                    <div className="space-y-6">
                        {/* Main Product Image */}
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative border-[3px] border-zyre-blue rounded-lg overflow-hidden"
                        >
                            <Image
                                src={product.images[activeImage]}
                                alt={`${product.name} - Image ${activeImage + 1}`}
                                width={600}
                                height={500}
                                className="w-full h-[500px] object-cover shadow-lg"
                            />
                        </motion.div>

                        {/* Image Thumbnails */}
                        {product.images.length > 0 && (
                            <div className="flex space-x-6 overflow-x-auto pb-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(index)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImage === index ? 'border-zyre-blue' : 'border-gray-300'
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <div className="flex space-x-3">
                                <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                                    <FaHeart className="w-4 h-4" />
                                    <span>Wishlist</span>
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                                    <FaShare className="w-4 h-4" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Table of Contents */}
                        {product.productDetails.length > 0 && (
                            <div className="border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => setIsTableOpen(!isTableOpen)}
                                    className="w-full bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-between"
                                >
                                    <span className="font-semibold">TABLE OF CONTENTS</span>
                                    <svg
                                        className={`w-5 h-5 transition-transform ${isTableOpen ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {isTableOpen && (
                                    <div className="p-4 space-y-2">
                                        {product.productDetails.map((detail, index) => (
                                            <a
                                                key={index}
                                                href={`#${getAnchorId(detail.label)}`}
                                                className="block text-gray-700 hover:text-primary"
                                            >
                                                {detail.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Help Section */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Help</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/faqs"
                                    className="block text-gray-600 hover:text-primary"
                                >
                                    FAQ
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block text-gray-600 hover:text-primary"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>

                        {/* Distributor Info */}
                        {product.distributor && (
                            <div className="space-y-4 border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800">Distributor</h3>
                                <div className="space-y-3">
                                    {product.distributor.logo && (
                                        <div className="flex justify-center mb-4">
                                            <Image
                                                src={product.distributor.logo}
                                                alt={product.distributor.name}
                                                width={120}
                                                height={60}
                                                className="h-16 w-auto object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-start space-x-2">
                                        <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {product.distributor.name}
                                            </p>
                                        </div>
                                    </div>
                                    {product.distributor.address !== 'N/A' && (
                                        <div className="flex items-start space-x-2">
                                            <FaMapMarkerAlt className="text-gray-600 mt-1" />
                                            <span className="text-gray-700 text-sm">
                                                {product.distributor.address}
                                            </span>
                                        </div>
                                    )}
                                    {product.distributor.email !== 'N/A' && (
                                        <div className="flex items-center space-x-2">
                                            <FaEnvelope className="text-gray-600" />
                                            <a
                                                href={`mailto:${product.distributor.email}`}
                                                className="text-primary hover:underline text-sm"
                                            >
                                                {product.distributor.email}
                                            </a>
                                        </div>
                                    )}
                                    {product.distributor.contact !== 'N/A' && (
                                        <div className="flex items-center space-x-2">
                                            <FaPhone className="text-gray-600" />
                                            <a
                                                href={`tel:${product.distributor.contact}`}
                                                className="text-primary hover:underline text-sm"
                                            >
                                                {product.distributor.contact}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Product Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Product Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Category:</span>
                                    <span className="text-gray-800 font-medium">{product.category}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Size:</span>
                                    <span className="text-gray-800">{product.size}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">FDA ID:</span>
                                    <span className="text-gray-800 font-mono text-sm">{product.fdaId}</span>
                                </div>
                                {product.price && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600">Price:</span>
                                        <span className="text-2xl font-bold text-primary">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="space-y-8">
                        {/* Product Title */}
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-start justify-between"
                        >
                            <div>
                                <p className="text-sm text-gray-600 mb-2">
                                    {product.genericName.toUpperCase()}
                                </p>
                                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                                    {product.name}
                                </h1>
                            </div>
                            <div className="text-6xl font-bold text-primary opacity-20">
                                Rx
                            </div>
                        </motion.div>

                        {/* Dynamic Product Details */}
                        {product.productDetails.map((detail, index) => (
                            <motion.section
                                key={index}
                                initial={false}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                id={getAnchorId(detail.label)}
                                className="space-y-3"
                            >
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {detail.label.toUpperCase()}
                                </h2>
                                <div
                                    className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{ __html: detail.description }}
                                />
                            </motion.section>
                        ))}

                        {/* Show message if no details */}
                        {product.productDetails.length === 0 && (
                            <div className="bg-gray-50 rounded-lg p-8 text-center">
                                <p className="text-gray-600">
                                    Detailed product information will be available soon.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-20">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailClient;
