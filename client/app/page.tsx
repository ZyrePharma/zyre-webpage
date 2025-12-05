import Carousel from './components/Carousel';
import FAQs from './components/FAQs';
import Hero from './components/Hero';
import Slider from './components/Slider';
import Newsletter from './components/Newsletter';
import AnimatedSection from './components/AnimatedSection';
import { getStrapiCollection, getStrapiURL } from '@/lib/strapi';
import ContactWithMap from './components/ContactWithMap';
import { MapLocation } from './components/LocationMap';

// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface StrapiImage {
    id: number;
    url: string;
    alternativeText?: string;
    name: string;
}

interface HeroItem {
    id: number;
    documentId: string;
    title: string;
    description: string;
    image?: StrapiImage; // Made optional since it might not always be populated
    order: number;
    isActive: boolean;
}

interface ProductDetail {
    id: number;
    label: string;
    description: string;
}

interface Product {
    id: number;
    documentId: string;
    brandName: string;
    genericName: string;
    category: string;
    size?: string;
    images: StrapiImage[];
    isFeatured: boolean;
    slug?: string;
    productDetails?: ProductDetail[];
}

interface FAQ {
    id: number;
    documentId: string;
    question: string;
    answer: string;
    order: number;
    category: string | null;
    isActive: boolean;
}

interface OfficeHour {
    day: 'Mon' | 'Tue' | 'Wed' | 'Th' | 'Fri' | 'Sat' | 'Sun';
    open_time: string;
    close_time: string;
    isClosed: boolean;
}

interface StrapiOffice {
    id: number;
    documentId: string;
    name: string;
    address: string;
    lat?: number;
    lng?: number;
    contact: Array<{
        type: string;
        value: string;
    }>;
    officeHours?: OfficeHour[];
}


async function fetchHeroItems(): Promise<HeroItem[]> {
    try {
        const response = await getStrapiCollection<HeroItem>('hero-items', {
            filters: { isActive: { $eq: true } },
            sort: ['order:asc'],
            populate: { image: true }
        }, {
            next: { revalidate: 60 }
        });
        return response.data || [];
    } catch (error) {
        console.error('Failed to fetch hero items:', error);
        return [];
    }
}


async function fetchCarouselImages(): Promise<Product[]> {
    try {
        // Fetch products where isFeatured is false
        const response = await getStrapiCollection<Product>('products', {
            filters: { isFeatured: { $eq: false } },
            populate: { images: true },
            pagination: { limit: 100 } // Get more products to have a good selection
        }, {
            next: { revalidate: 60 }
        });

        const products = response.data || [];

        // Use a deterministic selection based on the day of the year
        // This ensures server and client render the same products (avoiding hydration error)
        // Products will rotate daily
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - startOfYear.getTime();
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

        // Start from a different position each day
        const startIndex = dayOfYear % products.length;
        const selected = [];

        for (let i = 0; i < Math.min(5, products.length); i++) {
            const index = (startIndex + i) % products.length;
            selected.push(products[index]);
        }

        return selected;
    } catch (error) {
        console.error('Failed to fetch carousel images:', error);
        return [];
    }
}


async function fetchFeaturedProducts(): Promise<Product[]> {
    try {
        const response = await getStrapiCollection<Product>('products', {
            filters: { isFeatured: { $eq: true } },
            populate: { images: true, productDetails: true },
            pagination: { limit: 10 }
        }, {
            next: { revalidate: 60 }
        });
        return response.data || [];
    } catch (error) {
        console.error('Failed to fetch featured products:', error);
        return [];
    }
}


async function fetchFAQs(): Promise<FAQ[]> {
    try {
        const response = await getStrapiCollection<FAQ>('faqs', {
            filters: { isActive: { $eq: true } },
            sort: ['order:asc'],
            pagination: { limit: 100 }
        }, {
            next: { revalidate: 60 }
        });

        return response.data;
    } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        return [];
    }
}

async function fetchOffices(): Promise<MapLocation[]> {
    try {
        const response = await getStrapiCollection<StrapiOffice>('offices', {
            sort: ['name:asc'],
            publicationState: 'live',
            populate: { officeHours: true },
        }, {
            next: { revalidate: 3600 },
        });

        // Map office data directly using lat/lng from Strapi
        return response.data.map(office => ({
            lat: office.lat ?? 0,
            lng: office.lng ?? 0,
            name: office.name,
            address: office.address,
            ...(office.officeHours && { officeHours: office.officeHours }),
        }));
    } catch (error) {
        console.error('Failed to fetch offices:', error);
        return [];
    }
}


function transformHeroData(items: HeroItem[], strapiUrl: string) {
    return items
        .filter(item => item && item.image) // Filter out items without images
        .map(item => ({
            id: item.id,
            image: item.image?.url ? `${strapiUrl}${item.image.url}` : '/assets/banner1.jpg',
            title: item.title || '',
            description: item.description || ''
        }));
}


function transformCarouselData(products: Product[], strapiUrl: string) {
    return products
        .filter(product => product && product.images && product.images.length > 0) // Filter products with images
        .map(product => ({
            src: product.images[0]?.url ? `${strapiUrl}${product.images[0].url}` : '/assets/img1.jpg',
            alt: product.images[0]?.alternativeText || product.brandName || 'Product image'
        }));
}


function transformSliderData(products: Product[], strapiUrl: string) {
    return products
        .filter(product => product && product.images && product.images.length > 0) // Filter products with images
        .map(product => {
            // Extract formulation and indication from productDetails
            const formulation = product.productDetails
                ?.filter(detail => detail.label === 'FORMULATION')
                .map(detail => detail.description) || [];

            const indication = product.productDetails
                ?.filter(detail => detail.label === 'INDICATIONS')
                .map(detail => detail.description) || [];

            return {
                id: product.id,
                documentId: product.documentId,
                brandName: product.brandName || '',
                genericName: product.genericName || '',
                category: product.category || '',
                image: product.images[0]?.url ? `${strapiUrl}${product.images[0].url}` : '/assets/Med1.png',
                ...(product.slug && { slug: product.slug }),
                ...(formulation.length > 0 && { formulation }),
                ...(indication.length > 0 && { indication })
            };
        });
}


export default async function Home() {
    // Fetch all data in parallel for better performance
    const [heroSlides, carouselImages, featuredProducts, faqs, offices] = await Promise.all([
        fetchHeroItems(),
        fetchCarouselImages(),
        fetchFeaturedProducts(),
        fetchFAQs(),
        fetchOffices()
    ]);


    // Get Strapi URL for image transformations
    const strapiUrl = getStrapiURL();

    // Transform data for components
    const heroData = heroSlides.length > 0 ? transformHeroData(heroSlides, strapiUrl) : [];
    const carouselData = carouselImages.length > 0 ? transformCarouselData(carouselImages, strapiUrl) : [];
    const sliderData = featuredProducts.length > 0 ? transformSliderData(featuredProducts, strapiUrl) : [];


    return (
        <>
            <AnimatedSection>
                <Hero slides={heroData} />
            </AnimatedSection>

            <AnimatedSection>
                <Carousel images={carouselData} />
            </AnimatedSection>

            <AnimatedSection>
                <Slider products={sliderData} />
            </AnimatedSection>

            <AnimatedSection>
                <FAQs faqs={faqs} />
            </AnimatedSection>

            <AnimatedSection>
                <ContactWithMap offices={offices} />
            </AnimatedSection>

            <AnimatedSection className="container mx-auto px-4 py-12">
                <Newsletter />
            </AnimatedSection>
        </>
    );
}