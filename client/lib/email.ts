import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

/**
 * Email configuration interface
 */
interface EmailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

/**
 * Job application notification data
 */
export interface JobApplicationEmailData {
    fullName: string;
    email: string;
    contactNumber: string;
    jobTitle: string;
    resumeUrl?: string;
    submittedAt: string;
}

/**
 * Email service class for handling all email operations
 */
class EmailService {
    private transporter: Transporter | null = null;
    private fromEmail: string;
    private fromName: string;

    constructor() {
        this.fromEmail = process.env.SMTP_FROM_EMAIL || 'noreply@zyrepharma.com';
        this.fromName = process.env.SMTP_FROM_NAME || 'Zyre Pharma Careers';
    }

    /**
     * Initialize the email transporter with SMTP configuration
     */
    private getTransporter(): Transporter {
        if (this.transporter) {
            return this.transporter;
        }

        // Validate required environment variables
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
            throw new Error('SMTP configuration is incomplete. Please check environment variables.');
        }

        const config: EmailConfig = {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        };

        this.transporter = nodemailer.createTransport(config);

        return this.transporter;
    }

    /**
     * Generate HTML email template for job application notification
     */
    private generateJobApplicationEmailHTML(data: JobApplicationEmailData): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Job Application</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            border-bottom: 3px solid #0066cc;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        h1 {
            color: #0066cc;
            margin: 0;
            font-size: 24px;
        }
        .info-section {
            margin-bottom: 20px;
        }
        .info-label {
            font-weight: 600;
            color: #555;
            display: inline-block;
            width: 140px;
        }
        .info-value {
            color: #333;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #0066cc;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 New Job Application Received</h1>
        </div>
        
        <div class="info-section">
            <p><span class="info-label">Applicant Name:</span> <span class="info-value">${data.fullName}</span></p>
            <p><span class="info-label">Email:</span> <span class="info-value"><a href="mailto:${data.email}">${data.email}</a></span></p>
            <p><span class="info-label">Contact Number:</span> <span class="info-value">${data.contactNumber}</span></p>
            <p><span class="info-label">Position:</span> <span class="info-value"><strong>${data.jobTitle}</strong></span></p>
            <p><span class="info-label">Submitted:</span> <span class="info-value">${data.submittedAt}</span></p>
        </div>
        
        ${data.resumeUrl ? `
        <div style="margin-top: 30px;">
            <a href="${data.resumeUrl}" class="button">📄 View Resume</a>
        </div>
        ` : ''}
        
        <div class="footer">
            <p>This is an automated notification from Zyre Pharma Careers Portal.</p>
            <p>Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
        `.trim();
    }

    /**
     * Generate plain text email template for job application notification
     */
    private generateJobApplicationEmailText(data: JobApplicationEmailData): string {
        return `
NEW JOB APPLICATION RECEIVED
============================

Applicant Name: ${data.fullName}
Email: ${data.email}
Contact Number: ${data.contactNumber}
Position: ${data.jobTitle}
Submitted: ${data.submittedAt}

${data.resumeUrl ? `Resume: ${data.resumeUrl}` : ''}

---
This is an automated notification from Zyre Pharma Careers Portal.
Please do not reply to this email.
        `.trim();
    }

    /**
     * Send job application notification email
     */
    async sendJobApplicationNotification(data: JobApplicationEmailData): Promise<void> {
        const recipientEmail = process.env.NOTIFICATION_EMAIL;

        if (!recipientEmail) {
            throw new Error('NOTIFICATION_EMAIL environment variable is not set');
        }

        const transporter = this.getTransporter();

        const mailOptions = {
            from: `"${this.fromName}" <${this.fromEmail}>`,
            to: recipientEmail,
            subject: `New Job Application: ${data.jobTitle} - ${data.fullName}`,
            text: this.generateJobApplicationEmailText(data),
            html: this.generateJobApplicationEmailHTML(data),
        };

        await transporter.sendMail(mailOptions);
    }

    /**
     * Verify SMTP connection
     */
    async verifyConnection(): Promise<boolean> {
        try {
            const transporter = this.getTransporter();
            await transporter.verify();
            return true;
        } catch (error) {
            console.error('SMTP connection verification failed:', error);
            return false;
        }
    }
}

// Export singleton instance
export const emailService = new EmailService();
