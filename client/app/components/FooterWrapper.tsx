import { getStrapiCollection } from '../../lib/strapi';
import { Office, Portal, SisterCompany } from '../types';
import Footer from './Footer';

interface StrapiOffice {
    id: number;
    documentId: string;
    name: string;
    address: string;
    contact: Array<{
        type: string;
        value: string;
    }>;
    mapUrl?: string;
}

interface StrapiPortal {
    id: number;
    documentId: string;
    name: string;
    url: string;
}

interface StrapiSisterCompany {
    id: number;
    documentId: string;
    name: string;
    description?: string;
    website?: string;
    logo?: {
        url: string;
    };
    isActive?: boolean;
    order?: number;
}

async function getFooterData() {
    try {
        // Fetch offices with contact component populated
        const officesResponse = await getStrapiCollection<StrapiOffice>('offices', {
            populate: {
                contact: true,
            },
            sort: ['name:asc'],
        }, {
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        // Fetch portals
        const portalsResponse = await getStrapiCollection<StrapiPortal>('portals', {
            sort: ['name:asc'],
        }, {
            next: { revalidate: 3600 },
        });

        // Fetch sister companies (only active ones)
        const companiesResponse = await getStrapiCollection<StrapiSisterCompany>('sister-companies', {
            filters: {
                isActive: {
                    $eq: true,
                },
            },
            sort: ['order:asc', 'name:asc'],
        }, {
            next: { revalidate: 3600 },
        });

        // Transform offices data
        const offices: Office[] = officesResponse.data.map((item: StrapiOffice) => ({
            id: item.id,
            name: item.name || '',
            address: item.address || '',
            contact: item.contact || [],
            ...(item.mapUrl && { mapUrl: item.mapUrl }),
        }));

        // Transform portals data
        const portals: Portal[] = portalsResponse.data.map((item: StrapiPortal) => ({
            id: item.id,
            name: item.name || '',
            url: item.url || '#',
        }));

        // Transform sister companies data
        const companies: SisterCompany[] = companiesResponse.data.map((item: StrapiSisterCompany) => ({
            id: item.id,
            name: item.name || '',
            ...(item.website && { website: item.website }),
        }));

        return { offices, portals, companies };
    } catch (error) {
        console.error('Error fetching footer data:', error);
        // Return empty arrays as fallback
        return {
            offices: [],
            portals: [],
            companies: [],
        };
    }
}

export default async function FooterWrapper() {
    const { offices, portals, companies } = await getFooterData();

    return <Footer offices={offices} portals={portals} companies={companies} />;
}
