import React from 'react';
import { strapiFetch, getStrapiCollection, getStrapiURL } from '../../lib/strapi';
import AboutPageClient from './AboutPageClient';

interface SisterCompany {
  id: number;
  name: string;
  description: string;
  specialties: string[];
  website?: string;
  logo?: string;
}

interface AboutZyreData {
  data: {
    id: number;
    about: string;
    history: string;
    mission: string;
    vision: string;
  };
}

// Strapi sister company interface
interface StrapiSisterCompany {
  id: number;
  documentId: string;
  name: string;
  logo?: {
    url: string;
  };
  description: string;
  website?: string;
  address?: string;
  email?: string;
  phone?: string;
  order?: number;
  isActive?: boolean;
}

const AboutPage = async () => {
  // Fetch about data from Strapi
  let aboutData: AboutZyreData | null = null;

  try {
    aboutData = await strapiFetch<AboutZyreData>('/api/about-zyre', {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
  }

  const aboutText = aboutData?.data?.about || '';
  const historyText = aboutData?.data?.history || '';
  const missionText = aboutData?.data?.mission || '';
  const visionText = aboutData?.data?.vision || '';

  // Fetch sister companies from Strapi
  let sisterCompanies: SisterCompany[] = [];

  try {
    const response = await getStrapiCollection<StrapiSisterCompany>('sister-companies', {
      filters: {
        isActive: {
          $eq: true
        }
      },
      sort: ['order:asc'],
      populate: '*',
    });

    if (response?.data && response.data.length > 0) {
      sisterCompanies = response.data.map((company) => ({
        id: company.id,
        name: company.name || 'Unnamed Company',
        description: company.description || '',
        specialties: [], // You can add a specialties field to Strapi schema if needed
        ...(company.website && { website: company.website }),
        ...(company.logo?.url && { logo: `${getStrapiURL()}${company.logo.url}` }),
      }));
    }
  } catch (error) {
    console.error('Error fetching sister companies:', error);
    // Fallback to empty array if fetch fails
  }

  return (
    <AboutPageClient
      aboutText={aboutText}
      historyText={historyText}
      missionText={missionText}
      visionText={visionText}
      sisterCompanies={sisterCompanies}
    />
  );
};

export default AboutPage;
