import { getStrapiCollection, getStrapiEntry } from '../../../lib/strapi'
import { JobListing } from '../../types';
import JobDetailsClient from './JobDetailsClient';
import { notFound } from 'next/navigation';
import { StrapiBlockContent, StrapiBlock, StrapiTextChild } from '../../types/strapi-blocks';

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
  description?: StrapiBlockContent;
  requirements?: StrapiBlockContent;
  responsibilities?: StrapiBlockContent;
  postedDate: string;
  applicants: number;
  active: boolean;
}

// Helper function to convert blocks to string array
function blocksToStringArray(blocks: StrapiBlockContent | undefined): string[] {
  if (!blocks || !Array.isArray(blocks)) return [];

  return blocks
    .map((block: StrapiBlock) => {
      if (block.type === 'paragraph' && block.children) {
        return block.children
          .map((child: StrapiTextChild) => child.text || '')
          .join('')
          .trim();
      }
      if (block.type === 'list' && block.children) {
        return block.children
          .map((item) => {
            if (item.children) {
              return item.children
                .map((child: StrapiTextChild) => child.text || '')
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
function blocksToString(blocks: StrapiBlockContent | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks
    .map((block: StrapiBlock) => {
      if (block.type === 'paragraph' && block.children) {
        return block.children
          .map((child: StrapiTextChild) => child.text || '')
          .join('');
      }
      return '';
    })
    .join('\n')
    .trim();
}

async function getJob(slugOrId: string): Promise<JobListing | null> {
  try {
    // 1. Try to fetch by slug first
    const slugResponse = await getStrapiCollection<StrapiJobListing>('job-listings', {
      filters: {
        slug: {
          $eq: slugOrId,
        },
      },
      populate: '*',
      publicationState: 'live',
    }, {
      next: { revalidate: 1800 },
    });

    if (slugResponse.data && slugResponse.data.length > 0) {
      const item = slugResponse.data[0];
      return transformJobData(item);
    }

    // 2. If not found by slug, try to fetch by documentId
    // This handles cases where we might still be using IDs or for backward compatibility
    try {
      const idResponse = await getStrapiEntry<StrapiJobListing>('job-listings', slugOrId, '*', {
        next: { revalidate: 1800 },
      });

      if (idResponse.data) {
        const item = idResponse.data;
        return transformJobData(item);
      }
    } catch {
      // Ignore error if fetching by ID fails, it just means it wasn't an ID
    }

    return null;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

function transformJobData(item: StrapiJobListing): JobListing {
  return {
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
  };
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  return <JobDetailsClient job={job} />;
}

// Generate static params for all active jobs
export async function generateStaticParams() {
  try {
    const response = await getStrapiCollection<StrapiJobListing>('job-listings', {
      filters: {
        $or: [
          { active: { $eq: true } },
          { active: { $null: true } },
        ],
      },
      fields: ['slug'],
      publicationState: 'live',
    });

    return response.data.map((job) => ({
      id: job.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
