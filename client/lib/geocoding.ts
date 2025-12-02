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
 * Geocode an address to coordinates using Nominatim
 * @param address - The address to geocode
 * @returns Coordinates and display name, or null if geocoding fails
 */
export async function geocodeAddress(
    address: string
): Promise<GeocodingResult | null> {
    // Check cache first
    const cached = geocodeCache.get(address);
    if (cached) {
        return cached;
    }

    try {
        // Respect rate limiting
        await respectRateLimit();

        // Nominatim requires a valid User-Agent header
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
                q: address,
                format: 'json',
                limit: '1',
            }),
            {
                headers: {
                    'User-Agent': 'ZyrePharmaceuticals/1.0 (info@zyrepharma.com)', // Required by Nominatim
                },
                // Add timeout and signal for better error handling
                signal: AbortSignal.timeout(10000), // 10 second timeout
            }
        );

        if (!response.ok) {
            console.error(`Geocoding failed for "${address}": ${response.status} ${response.statusText}`);
            return null;
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            console.warn(`No results found for address: ${address}`);
            return null;
        }

        const result: GeocodingResult = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            displayName: data[0].display_name,
        };

        // Cache the result
        geocodeCache.set(address, result);

        return result;
    } catch (error) {
        // Provide detailed error information
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                console.error(`Geocoding timeout for "${address}": Request took longer than 10 seconds`);
            } else if (error.message.includes('fetch failed')) {
                console.error(`Network error geocoding "${address}": Unable to reach Nominatim API. Check internet connection or firewall settings.`);
            } else {
                console.error(`Geocoding error for "${address}":`, error.message);
            }
        } else {
            console.error(`Unknown geocoding error for "${address}":`, error);
        }
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
