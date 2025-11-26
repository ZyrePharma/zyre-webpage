'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProductCardProps } from '../types';
import Card from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import ProductSearch from '../components/ProductSearch';

// Dummy products data
const products: ProductCardProps[] = [
    {
        id: '1',
        name: 'Ziphanol',
        genericName: 'butorphanol tartrate',
        type: 'Opioid Analgesic',
        size: '1 mL x 10 Ampoules',
        description:
            'Ophthalmic Solution for irrigation of M.E.C. / 0.01% Sterile ophthalmic irrigating solution.',
        image: '/assets/product.png',
        fdaId: 'R-XX-123',
        price: 45.99,
    },
    {
        id: '2',
        name: 'Neurodex',
        genericName: 'dexamethasone sodium phosphate',
        type: 'Corticosteroid',
        size: '2 mL x 5 Ampoules',
        description: '4mg/mL Injection (I.V/I.M)',
        image: '/assets/product.png',
        fdaId: 'R-XX-124',
        price: 32.5,
    },
    {
        id: '3',
        name: 'Painexol',
        genericName: 'tramadol hydrochloride',
        type: 'Analgesic',
        size: '1 mL x 10 Ampoules',
        description: '50mg/mL Injection for moderate to severe pain management.',
        image: '/assets/product.png',
        fdaId: 'R-XX-125',
        price: 28.75,
    },
    {
        id: '4',
        name: 'Cardiolax',
        genericName: 'atenolol',
        type: 'Beta Blocker',
        size: '10 Tablets',
        description: '50mg Oral Tablets for cardiovascular conditions.',
        image: '/assets/product.png',
        fdaId: 'R-XX-126',
        price: 15.99,
    },
    {
        id: '5',
        name: 'Mydrapine',
        genericName: 'atropine sulfate',
        type: 'Anticholinergic',
        size: '1 mL x 10 Ampoules',
        description: '1mg/mL Injection for various medical procedures.',
        image: '/assets/product.png',
        fdaId: 'R-XX-127',
        price: 22.45,
    },
    {
        id: '6',
        name: 'Cardiox',
        genericName: 'metoprolol tartrate',
        type: 'Beta Blocker',
        size: '30 Tablets',
        description: '50mg Oral Tablets for hypertension and angina.',
        image: '/assets/product.png',
        fdaId: 'R-XX-128',
        price: 18.99,
    },
];

// Extract unique categories from products
const categories = ['All', ...Array.from(new Set(products.map((p) => p.type)))];

// Business partners data
const partners = [
    {
        id: '1',
        name: 'Myungmoon Pharma',
        logo: '/assets/partners/myungmoon-pharma.png',
    },
    {
        id: '2',
        name: 'Zazen Pharma',
        logo: '/assets/partners/zazen-pharma.png',
    },
    {
        id: '3',
        name: 'ZIM Lab',
        logo: '/assets/partners/zim-lab.png',
    },
    {
        id: '4',
        name: 'Brawn Lab',
        logo: '/assets/partners/brawn-lab.png',
    },
    {
        id: '5',
        name: 'Daewon',
        logo: '/assets/partners/daewon.png',
    },
    {
        id: '6',
        name: 'Norris Med',
        logo: '/assets/partners/norris-med.png',
    },
    {
        id: '7',
        name: 'Celon Labs',
        logo: '/assets/partners/celon-labs.png',
    },
    {
        id: '8',
        name: 'Aju Pharma',
        logo: '/assets/partners/aju-pharma.png',
    },
    {
        id: '9',
        name: 'NCPC',
        logo: '/assets/partners/ncpc.png',
    },
    {
        id: '10',
        name: 'Scott Edil',
        logo: '/assets/partners/scott-edil.png',
    },
    {
        id: '11',
        name: 'Aculife',
        logo: '/assets/partners/aculife.png',
    },
    {
        id: '12',
        name: 'Albert David',
        logo: '/assets/partners/albert-david.png',
    },
];

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

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter products based on category and search query
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Filter by category
            const matchesCategory =
                selectedCategory === 'All' || product.type === selectedCategory;

            // Filter by search query
            const matchesSearch =
                searchQuery === '' ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.type.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="p-8 bg-white">
            {/* Header */}
            <motion.div
                variants={itemVariants}
                initial="initial"
                animate="animate"
                className="mb-8 px-4"
            >
                <h1 className="text-xl font-bold text-primary">Our Products</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Discover our comprehensive range of pharmaceutical products
                </p>
            </motion.div>

            {/* Search Component */}
            <div className="mb-8 px-4">
                <ProductSearch
                    onSearch={handleSearch}
                    searchQuery={searchQuery}
                    placeholder="Search products by name, type, or description..."
                />
            </div>

            {/* Category Segmented Control */}
            <motion.div
                variants={itemVariants}
                initial="initial"
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

            {/* Results Count */}
            <motion.div
                variants={itemVariants}
                initial="initial"
                animate="animate"
                className="mb-4 px-4"
            >
                <p className="text-sm text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                </p>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    key={`${selectedCategory}-${searchQuery}`}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
                >
                    {filteredProducts.map((product, index) => (
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

            {/* Suppliers Section */}
            <motion.div
                variants={itemVariants}
                initial="initial"
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
                            className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={64}
                                height={64}
                                className="h-16 w-auto object-contain"
                            />
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