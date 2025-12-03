import { NextRequest, NextResponse } from 'next/server';
import { getStrapiURL } from '@/lib/strapi';

/**
 * POST /api/contact-messages
 * Handles contact form submissions by validating data and forwarding to Strapi
 */
export async function POST(request: NextRequest) {
    try {
        // Parse the incoming JSON data
        const contactData = await request.json();

        // Server-side validation
        const { name, email, subject, message } = contactData;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: { message: 'All fields are required: name, email, subject, and message' } },
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

        // Validate message length
        if (message.length < 10) {
            return NextResponse.json(
                { error: { message: 'Message must be at least 10 characters long' } },
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

        // Submit to Strapi
        const strapiUrl = getStrapiURL();
        const strapiResponse = await fetch(`${strapiUrl}/api/contact-messages`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                data: contactData
            }),
        });

        // Handle Strapi response
        if (!strapiResponse.ok) {
            const errorData = await strapiResponse.json().catch(() => ({}));
            console.error('Strapi API error:', errorData);

            return NextResponse.json(
                { error: { message: errorData.error?.message || 'Failed to submit contact message' } },
                { status: strapiResponse.status }
            );
        }

        const result = await strapiResponse.json();

        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        console.error('Error processing contact message:', error);

        return NextResponse.json(
            { error: { message: 'Internal server error. Please try again later.' } },
            { status: 500 }
        );
    }
}
