'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    featured: boolean;
}

interface ArticlesSectionProps {
    blogPosts: BlogPost[];
    categories: string[];
}

const ArticlesSection = ({ blogPosts, categories }: ArticlesSectionProps) => {
    const featuredPost = blogPosts.find((post) => post.featured);
    const regularPosts = blogPosts.filter((post) => !post.featured);

    return (
        <>
            {/* Articles Header Section */}
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            Our Articles
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Explore our collection of insightful articles covering pharmaceutical innovation,
                            industry trends, regulatory updates, and healthcare advancements.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === 'All'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Featured Post */}
                {featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Featured Article
                        </h2>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/2">
                                    <div className="relative h-64 md:h-full">
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="md:w-1/2 p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {featuredPost.category}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {featuredPost.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                                {featuredPost.author
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {featuredPost.author}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {featuredPost.date}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Blog Grid */}
                <div className="mb-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold text-gray-900 mb-8"
                    >
                        Latest Articles
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {post.category}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {post.author
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">
                                                    {post.author}
                                                </p>
                                                <p className="text-xs text-gray-500">{post.date}</p>
                                            </div>
                                        </div>
                                        <button className="text-primary hover:text-secondary font-medium text-sm">
                                            Read →
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticlesSection;
