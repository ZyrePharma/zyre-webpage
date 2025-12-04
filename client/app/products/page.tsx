'use client';

import React, { useEffect, useState } from 'react';
import { getStrapiCollection, getStrapiURL } from '@/lib/strapi';
import { ProductCardProps } from '../types';
import ProductsPage from './ProductsPage';

// Strapi Product interface matching the API response
interface StrapiProduct {
    documentId: string;
    slug?: string;
    brandName: string;
    genericName: string;
    category: string;
    size: string;
    description: string;
    images?: Array<{
        url: string;
    }>;
    fdaId: string;
    price?: number;
}

// Strapi Business Partner interface
interface StrapiBusinessPartner {
    name: string;
    order: number;
    logo?: {
        url: string;
    };
    website?: string;
    description?: string;
}

// Partner interface for the component
interface Partner {
    id: string;
    name: string;
    logo: string;
}

export default function Page() {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch products and business partners in parallel
                const [productsResponse, partnersResponse] = await Promise.all([
                    getStrapiCollection<StrapiProduct>('products', {
                        populate: { images: true },
                        sort: ['brandName:asc'],
                        pagination: {
                            pageSize: 100,
                        }
                    }),
                    getStrapiCollection<StrapiBusinessPartner>('business-partners', {
                        sort: ['order:asc'],
                        pagination: {
                            pageSize: 100,
                        }
                    })
                ]);

                // Transform products data
                if (productsResponse && productsResponse.data) {
                    const transformedProducts = productsResponse.data.map((item: StrapiProduct) => {
                        // Transform images array from Strapi
                        const images = item.images && item.images.length > 0
                            ? item.images.map(img => `${getStrapiURL()}${img.url}`)
                            : ['/assets/product.png'];

                        // Use slug if available, otherwise fall back to documentId
                        const productId = item.slug || item.documentId || '';

                        return {
                            id: productId,
                            name: item.brandName || 'Unknown Product',
                            genericName: item.genericName || '',
                            category: item.category || 'Uncategorized',
                            size: item.size || '',
                            description: item.description || '',
                            images,
                            fdaId: item.fdaId || '',
                            price: item.price ?? 0,
                        };
                    });
                    setProducts(transformedProducts);
                }

                // Transform business partners data
                if (partnersResponse && partnersResponse.data) {
                    const transformedPartners = partnersResponse.data.map((item: StrapiBusinessPartner & { id: number }) => ({
                        id: item.id?.toString() || '',
                        name: item.name || 'Unknown Partner',
                        logo: item.logo?.url ? `${getStrapiURL()}${item.logo.url}` : '/assets/partners/placeholder.png',
                    }));
                    setPartners(transformedPartners);
                }
            } catch (err) {
                console.error('Failed to fetch data from Strapi:', err);
                setError(err instanceof Error ? err.message : 'Failed to load data');
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-primary font-semibold">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <ProductsPage
            initialProducts={products}
            partners={partners}
            error={error}
        />
    );
}