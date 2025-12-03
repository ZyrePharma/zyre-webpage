import { NextRequest, NextResponse } from 'next/server';
import { getStrapiURL } from '@/lib/strapi';
import { emailService } from '@/lib/email';

/**
 * POST /api/job-applications
 * Handles job application submissions by validating data and forwarding to Strapi
 */
export async function POST(request: NextRequest) {
    try {
        // Parse the incoming FormData
        const formData = await request.formData();

        // Extract and validate the data
        const dataString = formData.get('data');
        if (!dataString || typeof dataString !== 'string') {
            return NextResponse.json(
                { error: { message: 'Invalid request format' } },
                { status: 400 }
            );
        }

        // Parse the JSON data
        let applicationData;
        try {
            applicationData = JSON.parse(dataString);
        } catch (e) {
            return NextResponse.json(
                { error: { message: 'Invalid JSON data' } },
                { status: 400 }
            );
        }

        // Server-side validation
        const { fullName, email, contactNumber, job_listing } = applicationData;

        if (!fullName || !email || !contactNumber || !job_listing) {
            return NextResponse.json(
                { error: { message: 'Missing required fields: fullName, email, contactNumber, and job_listing are required' } },
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

        // Validate resume file
        const resumeFile = formData.get('files.resume');
        if (!resumeFile || !(resumeFile instanceof File)) {
            return NextResponse.json(
                { error: { message: 'Resume file is required' } },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!allowedTypes.includes(resumeFile.type)) {
            return NextResponse.json(
                { error: { message: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed' } },
                { status: 400 }
            );
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (resumeFile.size > maxSize) {
            return NextResponse.json(
                { error: { message: 'File size exceeds 5MB limit' } },
                { status: 400 }
            );
        }

        // Two-step upload process
        const strapiUrl = getStrapiURL();

        // Prepare headers with authentication
        const headers: HeadersInit = {};

        // Add Authorization header if API key exists
        if (process.env.STRAPI_API_KEY) {
            headers.Authorization = `Bearer ${process.env.STRAPI_API_KEY}`;
        }

        // Step 1: Upload the resume file to get the file ID
        const uploadFormData = new FormData();
        uploadFormData.append('files', resumeFile);

        const uploadResponse = await fetch(`${strapiUrl}/api/upload`, {
            method: 'POST',
            headers,
            body: uploadFormData,
        });

        if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json().catch(() => ({}));
            console.error('File upload error:', errorData);

            return NextResponse.json(
                { error: { message: errorData.error?.message || 'Failed to upload resume file' } },
                { status: uploadResponse.status }
            );
        }

        const uploadedFiles = await uploadResponse.json();

        // Get the uploaded file ID
        if (!uploadedFiles || !Array.isArray(uploadedFiles) || uploadedFiles.length === 0) {
            return NextResponse.json(
                { error: { message: 'File upload failed - no file ID returned' } },
                { status: 500 }
            );
        }

        const resumeFileId = uploadedFiles[0].id;

        // Step 2: Submit the application data with the file ID
        const applicationPayload = {
            data: {
                ...applicationData,
                resume: resumeFileId
            }
        };

        const strapiResponse = await fetch(`${strapiUrl}/api/job-applications`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicationPayload),
        });

        // Handle Strapi response
        if (!strapiResponse.ok) {
            const errorData = await strapiResponse.json().catch(() => ({}));
            console.error('Strapi API error:', errorData);

            return NextResponse.json(
                { error: { message: errorData.error?.message || 'Failed to submit application to backend' } },
                { status: strapiResponse.status }
            );
        }

        const result = await strapiResponse.json();

        // Send email notification asynchronously (don't block the response)
        // If email fails, we still want the application to be submitted successfully
        setImmediate(async () => {
            try {
                // Fetch job listing title for the email
                let jobTitle = 'Unknown Position';
                try {
                    const jobResponse = await fetch(`${strapiUrl}/api/job-listings/${job_listing}`);
                    if (jobResponse.ok) {
                        const jobData = await jobResponse.json();
                        jobTitle = jobData.data?.title || jobTitle;
                    }
                } catch (err) {
                    console.warn('Failed to fetch job title for email:', err);
                }

                // Get resume URL if available
                const resumeUrl = uploadedFiles[0]?.url
                    ? `${strapiUrl}${uploadedFiles[0].url}`
                    : undefined;

                // Prepare email data
                const emailData: any = {
                    fullName,
                    email,
                    contactNumber,
                    jobTitle,
                    submittedAt: new Date().toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                    }),
                };

                // Only add resumeUrl if it exists
                if (resumeUrl) {
                    emailData.resumeUrl = resumeUrl;
                }

                await emailService.sendJobApplicationNotification(emailData);

                console.log('Job application notification email sent successfully');
            } catch (emailError) {
                // Log the error but don't fail the request
                console.error('Failed to send job application notification email:', emailError);
            }
        });

        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        console.error('Error processing job application:', error);

        return NextResponse.json(
            { error: { message: 'Internal server error. Please try again later.' } },
            { status: 500 }
        );
    }
}
