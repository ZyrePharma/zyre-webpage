/**
 * Geocoding utility using Nominatim API
 * Follows OpenStreetMap Nominatim usage policy:
 * https://operations.osmfoundation.org/policies/nominatim/
 */

export interface GeocodingResult {
    lat: number;
    lng: number;
    displayName: string;
}

// Cache to store geocoded addresses
const geocodeCache = new Map<string, GeocodingResult>();

// Rate limiting: Nominatim requires max 1 request per second
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second in milliseconds

/**
 * Delay execution to respect rate limits
 */
async function respectRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const delay = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    lastRequestTime = Date.now();
}

/**
 * Normalize address for better geocoding results
 * Standardizes Philippine address formats and common abbreviations
 */
function normalizeAddress(address: string): string {
    let normalized = address.trim();

    // Remove multiple spaces
    normalized = normalized.replace(/\s+/g, ' ');

    // Standardize common Philippine abbreviations
    const abbreviations: Record<string, string> = {
        // Barangay
        'brgy\\.?': 'Barangay',
        'bgry\\.?': 'Barangay',
        'bgy\\.?': 'Barangay',

        // Street types
        'st\\.?(?!\\w)': 'Street',
        'ave\\.?(?!\\w)': 'Avenue',
        'blvd\\.?': 'Boulevard',
        'rd\\.?(?!\\w)': 'Road',
        'dr\\.?(?!\\w)': 'Drive',

        // Building/Floor
        'bldg\\.?': 'Building',
        'flr\\.?': 'Floor',

        // Philippine regions
        'ncr': 'National Capital Region',
        'metro manila': 'Manila',

        // Common misspellings
        'quezon city': 'Quezon City',
        'makati city': 'Makati',
        'manila city': 'Manila',
    };

    // Apply abbreviation replacements (case-insensitive)
    Object.entries(abbreviations).forEach(([pattern, replacement]) => {
        const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
        normalized = normalized.replace(regex, replacement);
    });

    // Remove special characters that might confuse geocoding
    normalized = normalized.replace(/[#]/g, '');

    // Ensure proper comma spacing
    normalized = normalized.replace(/\s*,\s*/g, ', ');

    // Remove trailing/leading commas
    normalized = normalized.replace(/^,\s*|,\s*$/g, '');

    return normalized;
}

/**
 * Geocode an address to coordinates using Nominatim
 * @param address - The address to geocode
 * @returns Coordinates and display name, or null if geocoding fails
 */
export async function geocodeAddress(
    address: string
): Promise<GeocodingResult | null> {
    // Normalize the address first
    const normalizedAddress = normalizeAddress(address);

    // Check cache first (using normalized address)
    const cached = geocodeCache.get(normalizedAddress);
    if (cached) {
        return cached;
    }

    try {
        // Respect rate limiting
        await respectRateLimit();

        // Try multiple search strategies for better accuracy
        let result = await tryGeocoding(normalizedAddress);

        // If first attempt fails, try with "Philippines" appended
        if (!result && !normalizedAddress.toLowerCase().includes('philippines')) {
            console.log(`Retrying geocoding for "${normalizedAddress}" with Philippines bias...`);
            await respectRateLimit();
            result = await tryGeocoding(`${normalizedAddress}, Philippines`);
        }

        // If still no result, try structured search
        if (!result) {
            console.log(`Retrying geocoding for "${normalizedAddress}" with structured search...`);
            await respectRateLimit();
            result = await tryStructuredGeocoding(normalizedAddress);
        }

        if (result) {
            // Validate that coordinates are reasonable (within Philippines bounds roughly)
            // Philippines bounds: lat 4.5-21.5, lng 116-127
            const isInPhilippines =
                result.lat >= 4.0 && result.lat <= 22.0 &&
                result.lng >= 115.0 && result.lng <= 128.0;

            if (!isInPhilippines) {
                console.warn(`Coordinates for "${normalizedAddress}" (${result.lat}, ${result.lng}) appear to be outside Philippines. Result may be inaccurate.`);
            }

            // Cache the result (using normalized address)
            geocodeCache.set(normalizedAddress, result);
            console.log(`Successfully geocoded "${normalizedAddress}" to (${result.lat}, ${result.lng})`);
            return result;
        }

        console.warn(`All geocoding attempts failed for address: ${normalizedAddress}`);
        return null;
    } catch (error) {
        // Provide detailed error information
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                console.error(`Geocoding timeout for "${normalizedAddress}": Request took longer than 10 seconds`);
            } else if (error.message.includes('fetch failed')) {
                console.error(`Network error geocoding "${normalizedAddress}": Unable to reach Nominatim API. Check internet connection or firewall settings.`);
            } else {
                console.error(`Geocoding error for "${normalizedAddress}":`, error.message);
            }
        } else {
            console.error(`Unknown geocoding error for "${normalizedAddress}":`, error);
        }
        return null;
    }
}

/**
 * Try geocoding with standard search
 */
async function tryGeocoding(address: string): Promise<GeocodingResult | null> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
                q: address,
                format: 'json',
                limit: '1',
                countrycodes: 'ph', // Bias results to Philippines
                addressdetails: '1',
            }),
            {
                headers: {
                    'User-Agent': 'ZyrePharmaceuticals/1.0 (info@zyrepharma.com)',
                },
                signal: AbortSignal.timeout(10000),
            }
        );

        if (!response.ok) {
            console.error(`Geocoding request failed: ${response.status} ${response.statusText}`);
            return null;
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            return null;
        }

        return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            displayName: data[0].display_name,
        };
    } catch (error) {
        console.error('Error in tryGeocoding:', error);
        return null;
    }
}

/**
 * Try geocoding with structured search (better for Philippine addresses)
 */
async function tryStructuredGeocoding(address: string): Promise<GeocodingResult | null> {
    try {
        // Parse address components (basic parsing)
        const parts = address.split(',').map(p => p.trim());

        const params: Record<string, string> = {
            format: 'json',
            limit: '1',
            country: 'Philippines',
            addressdetails: '1',
        };

        // Try to identify components
        if (parts.length >= 1) params.street = parts[0];
        if (parts.length >= 2) params.city = parts[1];
        if (parts.length >= 3) params.state = parts[2];

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` + new URLSearchParams(params),
            {
                headers: {
                    'User-Agent': 'ZyrePharmaceuticals/1.0 (info@zyrepharma.com)',
                },
                signal: AbortSignal.timeout(10000),
            }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            return null;
        }

        return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            displayName: data[0].display_name,
        };
    } catch (error) {
        console.error('Error in tryStructuredGeocoding:', error);
        return null;
    }
}

/**
 * Geocode multiple addresses with proper rate limiting
 * @param addresses - Array of addresses to geocode
 * @returns Array of results (null for failed geocoding)
 */
export async function geocodeAddresses(
    addresses: string[]
): Promise<(GeocodingResult | null)[]> {
    const results: (GeocodingResult | null)[] = [];

    for (const address of addresses) {
        const result = await geocodeAddress(address);
        results.push(result);
    }

    return results;
}

/**
 * Clear the geocoding cache
 */
export function clearGeocodeCache(): void {
    geocodeCache.clear();
}
