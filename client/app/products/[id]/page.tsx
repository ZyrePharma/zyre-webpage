import { notFound } from 'next/navigation';
import { getStrapiCollection, getStrapiURL } from '../../../lib/strapi';
import ProductDetailClient from './ProductDetailClient';

// Strapi component interfaces
interface PharmaceuticalDetail {
    label: string;
    description: string;
    order?: number;
}

interface Distributor {
    name?: string;
    address?: string;
    email?: string;
    contact?: string;
    logo?: {
        url: string;
    };
}

// Strapi Product interface matching the schema
interface StrapiProduct {
    documentId: string;
    slug?: string;
    brandName: string;
    genericName: string;
    category: string;
    size?: string;
    images?: Array<{
        url: string;
    }>;
    fdaId?: string;
    price?: number;
    featured?: boolean;
    productDetails?: PharmaceuticalDetail[];
    Distributor?: Distributor;
}

// Product interface for the client component
export interface Product {
    id: string;
    name: string;
    genericName: string;
    category: string;
    size: string;
    images: string[];
    fdaId: string;
    price?: number;
    productDetails: Array<{
        label: string;
        description: string;
    }>;
    distributor?: {
        name: string;
        address: string;
        email: string;
        contact: string;
        logo?: string | undefined;
    };
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Await params in Next.js 15
    const { id } = await params;

    try {
        // Fetch product from Strapi by slug using filters
        const response = await getStrapiCollection<StrapiProduct>('products', {
            filters: {
                slug: {
                    $eq: id
                }
            },
            populate: '*',
        });

        // Check if we found a product
        if (!response || !response.data || response.data.length === 0) {
            notFound();
        }

        const item = response.data[0]; // Get the first (and should be only) result

        // Transform images array from Strapi
        const images = item.images && item.images.length > 0
            ? item.images.map(img => `${getStrapiURL()}${img.url}`)
            : ['/assets/product.png'];

        // Sort product details by order if available
        const productDetails = item.productDetails
            ? [...item.productDetails]
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map(detail => ({
                    label: detail.label,
                    description: detail.description
                }))
            : [];

        // Transform distributor data
        const distributor = item.Distributor ? {
            name: item.Distributor.name || 'Unknown',
            address: item.Distributor.address || 'N/A',
            email: item.Distributor.email || 'N/A',
            contact: item.Distributor.contact || 'N/A',
            logo: item.Distributor.logo?.url
                ? `${getStrapiURL()}${item.Distributor.logo.url}`
                : undefined
        } : undefined;

        // Transform product data
        const product: Product = {
            id: item.slug || item.documentId || id,
            name: item.brandName || 'Unknown Product',
            genericName: item.genericName || '',
            category: item.category || 'Uncategorized',
            size: item.size || 'N/A',
            images,
            fdaId: item.fdaId || 'N/A',
            ...(item.price !== undefined && { price: item.price }),
            productDetails,
            ...(distributor && { distributor })
        };

        return <ProductDetailClient product={product} />;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        notFound();
    }
}