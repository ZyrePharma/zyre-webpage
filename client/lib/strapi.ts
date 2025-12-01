// lib/strapi.ts
import qs from 'qs';

// ============================================================================
// TypeScript Interfaces
// ============================================================================

/**
 * Standard Strapi response for a single entry
 */
export interface StrapiResponse<T> {
    data: T & {
        id: number;
        attributes?: Record<string, unknown>;
    };
    meta?: Record<string, unknown>;
}

/**
 * Standard Strapi response for a collection
 */
export interface StrapiCollectionResponse<T> {
    data: Array<T & {
        id: number;
        attributes?: Record<string, unknown>;
    }>;
    meta?: StrapiMeta;
}

/**
 * Strapi pagination metadata
 */
export interface StrapiMeta {
    pagination?: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

/**
 * Query parameters for Strapi API calls
 */
export interface StrapiQueryParams {
    filters?: Record<string, unknown>;
    populate?: string | string[] | Record<string, unknown>;
    sort?: string | string[];
    pagination?: {
        page?: number;
        pageSize?: number;
        start?: number;
        limit?: number;
    };
    fields?: string[];
    publicationState?: 'live' | 'preview';
    locale?: string;
}

/**
 * Options for strapiFetch including Next.js caching
 */
export interface StrapiFetchOptions extends RequestInit {
    queryParams?: StrapiQueryParams;
}


export function getStrapiURL(): string {
    return process.env.STRAPI_URL ||
        process.env.NEXT_PUBLIC_STRAPI_URL ||
        process.env.PUBLIC_STRAPI_URL ||
        "http://localhost:1337";
}




export async function strapiFetch<T>(
    path: string,
    options: StrapiFetchOptions = {}
): Promise<T> {
    const { queryParams, ...fetchOptions } = options;

    // Resolve Strapi URL with fallbacks
    const strapiUrl = getStrapiURL();

    // Build query string if query parameters are provided
    const queryString = queryParams ? `?${qs.stringify(queryParams, { encodeValuesOnly: true })}` : '';
    const url = `${strapiUrl}${path}${queryString}`;

    // Prepare headers
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
    };

    // Add Authorization header only if API key exists
    if (process.env.STRAPI_API_KEY) {
        (headers as Record<string, string>).Authorization = `Bearer ${process.env.STRAPI_API_KEY}`;
    }

    try {
        const res = await fetch(url, {
            headers,
            ...fetchOptions,
        });

        if (!res.ok) {
            // Try to parse error response
            let errorMessage = `Strapi request failed with status ${res.status}`;
            try {
                const errorData = await res.json();
                errorMessage = errorData.error?.message || errorData.message || errorMessage;
            } catch {
                // If JSON parsing fails, use status text
                errorMessage = `${errorMessage}: ${res.statusText}`;
            }

            console.error("Strapi fetch error:", {
                url,
                status: res.status,
                message: errorMessage,
            });

            throw new Error(errorMessage);
        }

        return res.json() as Promise<T>;
    } catch (error) {
        // Re-throw with additional context if it's not already our error
        if (error instanceof Error && !error.message.includes('Strapi')) {
            console.error("Network or parsing error:", error);
            throw new Error(`Failed to fetch from Strapi: ${error.message}`);
        }
        throw error;
    }
}

// ============================================================================
// Helper Functions
// ============================================================================


export async function getStrapiEntry<T>(
    collection: string,
    id: string | number,
    populate?: string | string[] | Record<string, unknown>,
    options: StrapiFetchOptions = {}
): Promise<StrapiResponse<T>> {
    return strapiFetch<StrapiResponse<T>>(
        `/api/${collection}/${id}`,
        {
            ...options,
            queryParams: {
                populate: populate || '*',
                ...options.queryParams,
            },
        }
    );
}


export async function getStrapiCollection<T>(
    collection: string,
    queryParams?: StrapiQueryParams,
    options: StrapiFetchOptions = {}
): Promise<StrapiCollectionResponse<T>> {
    return strapiFetch<StrapiCollectionResponse<T>>(
        `/api/${collection}`,
        {
            ...options,
            queryParams: {
                populate: '*',
                ...queryParams,
                ...options.queryParams,
            },
        }
    );
}
