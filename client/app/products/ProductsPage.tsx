'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProductCardProps } from '../types';
import Card from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import ProductSearch from '../components/ProductSearch';

interface ProductsPageProps {
    initialProducts: ProductCardProps[];
    partners: Array<{
        id: string;
        name: string;
        logo: string;
    }>;
    error: string | null;
}

// Animation variants
const containerVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
};

export default function ProductsPage({
    initialProducts = [],
    partners = [],
    error
}: ProductsPageProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Extract unique categories from products
    const categories = useMemo(() => {
        if (!initialProducts || initialProducts.length === 0) return ['All'];
        return ['All', ...Array.from(new Set(initialProducts.map((p) => p.category)))];
    }, [initialProducts]);

    // Filter products based on category and search query
    const filteredProducts = useMemo(() => {
        if (!initialProducts || initialProducts.length === 0) return [];
        return initialProducts.filter((product) => {
            // Filter by category
            const matchesCategory =
                selectedCategory === 'All' || product.category === selectedCategory;

            // Filter by search query
            const matchesSearch =
                searchQuery === '' ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [initialProducts, selectedCategory, searchQuery]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, itemsPerPage]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Safety check - now after all hooks
    if (!initialProducts) {
        return <div className="p-8 text-center">Loading products...</div>;
    }

    // Show error state if there was an error fetching from Strapi
    if (error) {
        return (
            <div className="p-8 bg-white min-h-screen flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
                    <h2 className="text-xl font-bold text-red-800 mb-2">
                        Failed to Load Products
                    </h2>
                    <p className="text-sm text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-white">
            {/* Header */}
            <motion.div
                variants={itemVariants}
                initial={false}
                animate="animate"
                className="mb-8 px-4"
            >
                <h1 className="text-xl font-bold text-primary">Our Products</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Discover our comprehensive range of pharmaceutical products
                </p>
            </motion.div>

            {/* Search Component */}
            <div className="mb-8 px-4 text-primary">
                <ProductSearch
                    onSearch={handleSearch}
                    searchQuery={searchQuery}
                    placeholder="Search products by name, type, or description..."
                />
            </div>

            {/* Category Segmented Control */}
            <motion.div
                variants={itemVariants}
                initial={false}
                animate="animate"
                className="mb-8 px-4"
            >
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${selectedCategory === category
                                ? 'bg-primary text-white shadow-md scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Results Count and Items Per Page */}
            <motion.div
                variants={itemVariants}
                initial={false}
                animate="animate"
                className="mb-4 px-4 flex flex-wrap items-center justify-between gap-4"
            >
                <p className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                </p>
                <div className="flex items-center gap-2">
                    <label htmlFor="itemsPerPage" className="text-sm text-primary font-medium">
                        Show:
                    </label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="px-3 py-1.5 border-2 border-primary rounded-lg text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial={false}
                    animate="animate"
                    key={`${selectedCategory}-${searchQuery}`}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
                >
                    {paginatedProducts.map((product, index) => (
                        <motion.div key={product.id} variants={itemVariants} custom={index}>
                            <Card product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 py-16 text-center"
                >
                    <div className="bg-gray-50 rounded-lg p-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            No products found
                        </h3>
                        <p className="text-sm text-gray-600">
                            Try adjusting your search or filter criteria
                        </p>
                        {(searchQuery || selectedCategory !== 'All') && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                }}
                                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Pagination Controls */}
            {filteredProducts.length > 0 && totalPages > 1 && (
                <motion.div
                    variants={itemVariants}
                    initial={false}
                    animate="animate"
                    className="mt-8 px-4 flex justify-center items-center gap-2"
                >
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:hover:bg-gray-100"
                    >
                        Previous
                    </button>

                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Show first page, last page, current page, and pages around current
                            const showPage =
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1);

                            const showEllipsis =
                                (page === currentPage - 2 && currentPage > 3) ||
                                (page === currentPage + 2 && currentPage < totalPages - 2);

                            if (showEllipsis) {
                                return (
                                    <span key={page} className="px-2 py-2 text-gray-400">
                                        ...
                                    </span>
                                );
                            }

                            if (!showPage) return null;

                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${currentPage === page
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:hover:bg-gray-100"
                    >
                        Next
                    </button>
                </motion.div>
            )}

            {/* Suppliers Section */}
            <motion.div
                variants={itemVariants}
                initial={false}
                animate="animate"
                className="mt-16 mb-8 px-4"
            >
                <h2 className="text-xl font-bold text-primary mb-6">
                    Our Business Partners
                </h2>
                <div className="flex flex-wrap gap-8 justify-center items-center">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            variants={itemVariants}
                            custom={index}
                            className="relative flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                            title={partner.name}
                        >
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={64}
                                height={64}
                                className="h-16 w-auto object-contain"
                            />
                            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                                {partner.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Newsletter Section */}
            <div className="mt-16 px-4">
                <Newsletter />
            </div>
        </div>
    );
}
