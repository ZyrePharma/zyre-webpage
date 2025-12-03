import { NextRequest, NextResponse } from 'next/server';
import { getStrapiURL } from '@/lib/strapi';

/**
 * POST /api/newsletter-subscribers
 * Handles newsletter subscription by validating email and forwarding to Strapi
 */
export async function POST(request: NextRequest) {
    try {
        // Parse the incoming JSON data
        const { email } = await request.json();

        // Server-side validation
        if (!email) {
            return NextResponse.json(
                { error: { message: 'Email is required' } },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: { message: 'Invalid email format' } },
                { status: 400 }
            );
        }

        // Prepare headers with authentication
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Add Authorization header if API key exists
        if (process.env.STRAPI_API_KEY) {
            headers.Authorization = `Bearer ${process.env.STRAPI_API_KEY}`;
        }

        const strapiUrl = getStrapiURL();

        // Check if email already exists
        const checkResponse = await fetch(
            `${strapiUrl}/api/newsletter-subscribers?filters[email][$eq]=${encodeURIComponent(email)}`,
            {
                method: 'GET',
                headers,
            }
        );

        if (checkResponse.ok) {
            const existingData = await checkResponse.json();
            if (existingData.data && existingData.data.length > 0) {
                return NextResponse.json(
                    { error: { message: 'This email is already subscribed' } },
                    { status: 409 }
                );
            }
        }

        // Submit to Strapi
        const subscriberData = {
            email,
            subscribedAt: new Date().toISOString(),
            isActive: true,
        };

        const strapiResponse = await fetch(`${strapiUrl}/api/newsletter-subscribers`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                data: subscriberData
            }),
        });

        // Handle Strapi response
        if (!strapiResponse.ok) {
            const errorData = await strapiResponse.json().catch(() => ({}));
            console.error('Strapi API error:', errorData);

            return NextResponse.json(
                { error: { message: errorData.error?.message || 'Failed to subscribe to newsletter' } },
                { status: strapiResponse.status }
            );
        }

        const result = await strapiResponse.json();

        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        console.error('Error processing newsletter subscription:', error);

        return NextResponse.json(
            { error: { message: 'Internal server error. Please try again later.' } },
            { status: 500 }
        );
    }
}
