import { getStrapiCollection, getStrapiURL } from '../../lib/strapi';
import { JobListing, ZyreBenefit } from '../types';
import CareersPageClient from './CareersPageClient';

interface StrapiJobListing {
  id: number;
  documentId: string;
  slug: string;
  position: string;
  type: 'Full Time' | 'Part Time' | 'Contract';
  department: string;
  location: string;
  vacancies: number;
  salaryRange: string;
  description?: any;
  requirements?: any;
  responsibilities?: any;
  postedDate: string;
  applicants: number;
  active: boolean;
}

interface StrapiBenefit {
  name: string;
  icon?: {
    url: string;
  };
}

interface StrapiZyreBenefit {
  id: number;
  documentId: string;
  department: string;
  benefits: StrapiBenefit[];
}

// Helper function to convert blocks to string array
function blocksToStringArray(blocks: any): string[] {
  if (!blocks || !Array.isArray(blocks)) return [];

  return blocks
    .map((block: any) => {
      if (block.type === 'paragraph' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('')
          .trim();
      }
      if (block.type === 'list' && block.children) {
        return block.children
          .map((item: any) => {
            if (item.children) {
              return item.children
                .map((child: any) => child.text || '')
                .join('')
                .trim();
            }
            return '';
          })
          .filter((text: string) => text.length > 0);
      }
      return '';
    })
    .flat()
    .filter((text: string) => text.length > 0);
}

// Helper function to convert blocks to string
function blocksToString(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks
    .map((block: any) => {
      if (block.type === 'paragraph' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('');
      }
      return '';
    })
    .join('\n')
    .trim();
}

async function getCareersData() {
  try {
    const strapiUrl = getStrapiURL();

    // Fetch active job listings (including those where active is null)
    const jobsResponse = await getStrapiCollection<StrapiJobListing>('job-listings', {
      filters: {
        $or: [
          { active: { $eq: true } },
          { active: { $null: true } }, // Include entries where active is null
        ],
      },
      sort: ['postedDate:desc'],
      populate: '*',
      publicationState: 'live', // Only fetch published entries
    }, {
      next: { revalidate: 1800 }, // Revalidate every 30 minutes
    });

    console.log('Jobs Response:', JSON.stringify(jobsResponse, null, 2));

    // Fetch benefits
    const benefitsResponse = await getStrapiCollection<StrapiZyreBenefit>('zyre-benefits', {
      populate: {
        benefits: {
          populate: '*',
        },
      },
      sort: ['department:asc'],
      publicationState: 'live', // Only fetch published entries
    }, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    console.log('Benefits Response:', JSON.stringify(benefitsResponse, null, 2));

    // Transform job listings
    const jobListings: JobListing[] = jobsResponse.data.map((item: StrapiJobListing) => ({
      id: item.id.toString(),
      documentId: item.documentId,
      slug: item.slug || '',
      position: item.position || '',
      type: item.type || 'Full Time',
      department: item.department || '',
      location: item.location || '',
      vacancies: item.vacancies || 0,
      salaryRange: item.salaryRange || '',
      description: blocksToString(item.description),
      requirements: blocksToStringArray(item.requirements),
      responsibilities: blocksToStringArray(item.responsibilities),
      postedDate: item.postedDate || new Date().toISOString(),
      applicants: item.applicants || 0,
      active: item.active ?? true,
    }));

    console.log('Transformed Job Listings:', jobListings);

    // Transform benefits
    const benefits: ZyreBenefit[] = benefitsResponse.data.map((item: StrapiZyreBenefit) => {
      return {
        id: item.id,
        department: item.department || '',
        benefits: (item.benefits || []).map((benefit: StrapiBenefit) => {
          const iconFileName = benefit.icon?.url ? benefit.icon.url.split('/').pop()?.split('.')[0] : undefined;

          // Only include icon property if it has a value (for exactOptionalPropertyTypes)
          const benefitObj: { name: string; icon?: string } = {
            name: benefit.name || '',
          };

          if (iconFileName) {
            benefitObj.icon = iconFileName;
          }

          return benefitObj;
        }),
      };
    });

    console.log('Transformed Benefits:', benefits);

    return { jobListings, benefits };
  } catch (error) {
    console.error('Error fetching careers data:', error);
    // Return empty arrays as fallback
    return {
      jobListings: [],
      benefits: [],
    };
  }
}

export default async function CareersPage() {
  const { jobListings, benefits } = await getCareersData();

  return <CareersPageClient jobListings={jobListings} benefits={benefits} />;
}
