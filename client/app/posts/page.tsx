import React from 'react';
import Newsletter from '../components/Newsletter';
import CompanyGallery from './CompanyGallery';
import ArticlesSection from './ArticlesSection';
import HeroSection from './HeroSection';
import { getStrapiCollection, getStrapiURL } from '@/lib/strapi';

// TypeScript interfaces for Strapi data
interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  name: string;
}

interface StrapiCompanyGallery {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  category?: string;
  order: number;
  images: StrapiImage[];
}

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
    date: 'December 12, 2024',
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

// Fetch company gallery data from Strapi
async function fetchCompanyGallery(): Promise<GalleryCollection[]> {
  try {
    const response = await getStrapiCollection<StrapiCompanyGallery>('company-galleries', {
      populate: { images: true },
      sort: ['order:asc'],
      pagination: { limit: 100 },
    });

    const strapiUrl = getStrapiURL();
    const galleries: GalleryCollection[] = [];

    // Transform Strapi data to component format - keep galleries grouped
    response.data.forEach((gallery) => {
      if (gallery.images && Array.isArray(gallery.images) && gallery.images.length > 0) {
        const images: CompanyGalleryImage[] = gallery.images.map((image) => ({
          id: image.id,
          src: `${strapiUrl}${image.url}`,
          alt: image.alternativeText || gallery.title || 'Company gallery image',
          title: image.caption || image.name,
        }));

        galleries.push({
          id: gallery.id,
          title: gallery.title,
          description: gallery.description,
          images,
        });
      }
    });

    return galleries;
  } catch (error) {
    console.error('Error fetching company gallery:', error);
    // Return empty array on error to prevent page crash
    return [];
  }
}

const PostsPage = async () => {
  // Fetch gallery data
  const galleries = await fetchCompanyGallery();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Company Gallery Section */}
      <CompanyGallery galleries={galleries} />

      {/* Articles Section */}
      <ArticlesSection blogPosts={blogPosts} categories={categories} />

      {/* Newsletter Signup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Newsletter />
      </div>
    </div>
  );
};

export default PostsPage;
