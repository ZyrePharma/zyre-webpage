import Carousel from './components/Carousel';
import ContactPage from './components/Contact';
import FAQs from './components/FAQs';
import Hero from './components/Hero';
import Slider from './components/Slider';
import Newsletter from './components/Newsletter';
import AnimatedSection from './components/AnimatedSection';
import { getStrapiCollection, getStrapiURL } from '@/lib/strapi';

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
    image: StrapiImage;
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

        // Shuffle and select 5 random products
        const shuffled = [...products].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 5);
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


function transformHeroData(items: HeroItem[], strapiUrl: string) {
    return items.map(item => ({
        id: item.id,
        image: item.image?.url ? `${strapiUrl}${item.image.url}` : '/assets/banner1.jpg',
        title: item.title,
        description: item.description
    }));
}


function transformCarouselData(products: Product[], strapiUrl: string) {
    return products.map(product => ({
        src: product.images?.[0]?.url ? `${strapiUrl}${product.images[0].url}` : '/assets/img1.jpg',
        alt: product.images?.[0]?.alternativeText || product.brandName || 'Product image'
    }));
}


function transformSliderData(products: Product[], strapiUrl: string) {
    return products.map(product => {
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
            brandName: product.brandName,
            genericName: product.genericName,
            category: product.category,
            image: product.images?.[0]?.url ? `${strapiUrl}${product.images[0].url}` : '/assets/Med1.png',
            ...(product.slug && { slug: product.slug }),
            ...(formulation.length > 0 && { formulation }),
            ...(indication.length > 0 && { indication })
        };
    });
}


export default async function Home() {
    // Fetch all data in parallel for better performance
    const [heroSlides, carouselImages, featuredProducts, faqs] = await Promise.all([
        fetchHeroItems(),
        fetchCarouselImages(),
        fetchFeaturedProducts(),
        fetchFAQs()
    ]);

    // Get Strapi URL for image transformations
    const strapiUrl = getStrapiURL();

    // Transform data for components
    const heroData = transformHeroData(heroSlides, strapiUrl);
    const carouselData = transformCarouselData(carouselImages, strapiUrl);
    const sliderData = transformSliderData(featuredProducts, strapiUrl);


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
                <ContactPage />
            </AnimatedSection>

            <AnimatedSection className="container mx-auto px-4 py-12">
                <Newsletter />
            </AnimatedSection>
        </>
    );
}