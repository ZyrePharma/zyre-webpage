'use client';

import React from 'react';
import Image from 'next/image';
import Newsletter from '../components/Newsletter';
import { motion } from 'framer-motion';

// Placeholder blog data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Pharmaceutical Innovation',
    excerpt:
      'Exploring cutting-edge technologies and methodologies that are revolutionizing the pharmaceutical industry and improving patient outcomes worldwide.',
    author: 'Dr. Sarah Johnson',
    date: 'December 15, 2024',
    category: 'Innovation',
    readTime: '5 min read',
    image: '/assets/banner1.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Understanding Drug Development Process',
    excerpt:
      'A comprehensive guide to how pharmaceutical companies develop new medications from initial research to market approval.',
    author: 'Dr. Michael Chen',
    date: 'December 12, 2024',
    category: 'Education',
    readTime: '7 min read',
    image: '/assets/banner2.jpg',
    featured: false,
  },
  {
    id: 3,
    title: 'Quality Assurance in Manufacturing',
    excerpt:
      'The critical importance of maintaining the highest quality standards in pharmaceutical manufacturing processes.',
    author: 'Dr. Emily Rodriguez',
    date: 'December 10, 2024',
    category: 'Quality',
    readTime: '4 min read',
    image: '/assets/banner3.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'Global Health Initiatives',
    excerpt:
      'How pharmaceutical companies are contributing to global health initiatives and making healthcare accessible worldwide.',
    author: 'Dr. James Wilson',
    date: 'December 8, 2024',
    category: 'Global Health',
    readTime: '6 min read',
    image: '/assets/banner4.jpg',
    featured: false,
  },
  {
    id: 5,
    title: 'Regulatory Compliance Updates',
    excerpt:
      'Latest updates on pharmaceutical regulations and how they impact drug development and manufacturing processes.',
    author: 'Dr. Lisa Thompson',
    date: 'December 5, 2024',
    category: 'Regulatory',
    readTime: '8 min read',
    image: '/assets/banner5.jpg',
    featured: false,
  },
  {
    id: 6,
    title: 'Patient-Centric Drug Design',
    excerpt:
      'How modern pharmaceutical companies are focusing on patient needs and experiences in drug development.',
    author: 'Dr. Robert Kim',
    date: 'December 3, 2024',
    category: 'Patient Care',
    readTime: '5 min read',
    image: '/assets/banner6.jpg',
    featured: false,
  },
];

const categories = [
  'All',
  'Innovation',
  'Education',
  'Quality',
  'Global Health',
  'Regulatory',
  'Patient Care',
];

// Company gallery images
const companyImages = [
  {
    id: 1,
    src: '/assets/img1.jpg',
    alt: 'Zyre Pharmaceuticals Manufacturing Facility',
    title: 'State-of-the-art Manufacturing Facility',
  },
  {
    id: 2,
    src: '/assets/img2.jpg',
    alt: 'Research and Development Laboratory',
    title: 'Advanced R&D Laboratory',
  },
  {
    id: 3,
    src: '/assets/img3.jpg',
    alt: 'Quality Control Department',
    title: 'Quality Control & Testing',
  },
  {
    id: 4,
    src: '/assets/img4.jpg',
    alt: 'Team Collaboration Meeting',
    title: 'Expert Team Collaboration',
  },
  {
    id: 5,
    src: '/assets/img5.jpg',
    alt: 'Global Distribution Network',
    title: 'Worldwide Distribution',
  },
  {
    id: 6,
    src: '/assets/Med1.png',
    alt: 'Pharmaceutical Products',
    title: 'Our Pharmaceutical Products',
  },
  {
    id: 7,
    src: '/assets/Med2.png',
    alt: 'Medical Equipment',
    title: 'Advanced Medical Equipment',
  },
  {
    id: 8,
    src: '/assets/Med3.png',
    alt: 'Healthcare Solutions',
    title: 'Comprehensive Healthcare Solutions',
  },
];

const PostsPage = () => {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
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

      {/* Company Gallery Section */}
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
            {companyImages.map((image, index) => {
              // Bento Grid Pattern
              const isLarge = index === 0 || index === 5;
              const isTall = index === 3;
              const isWide = index === 6;

              let spanClass = "col-span-1 row-span-1";
              if (index === 0) spanClass = "md:col-span-2 md:row-span-2";
              else if (index === 3) spanClass = "md:col-span-2 md:row-span-1";
              else if (index === 4) spanClass = "md:col-span-1 md:row-span-2";
              else if (index === 6) spanClass = "md:col-span-2 md:row-span-2";

              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg ${spanClass}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {image.title}
                      </h3>
                      <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {image.alt}
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

        {/* Newsletter Signup */}
        <Newsletter />
      </div>
    </div>
  );
};

export default PostsPage;
