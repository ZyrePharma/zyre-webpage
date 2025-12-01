'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    MdLocationOn,
    MdWork,
    MdAttachMoney,
    MdPeople,
    MdCalendarToday,
    MdArrowBack,
    MdDescription,
    MdEmail,
    MdPhone,
    MdPerson,
    MdUploadFile,
} from 'react-icons/md';
import { motion } from 'framer-motion';
import Newsletter from '../../components/Newsletter';
import { JobListing } from '../../types';

interface JobDetailsClientProps {
    job: JobListing;
}

interface ApplicationFormData {
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
    resume: File | null;
}

// Helper function to calculate "posted ago" text
function getPostedAgo(postedDate: string): string {
    const posted = new Date(postedDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return '1 month ago';
    return `${Math.floor(diffDays / 30)} months ago`;
}

const JobDetailsClient: React.FC<JobDetailsClientProps> = ({ job }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<ApplicationFormData>({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                resume: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitStatus('success');

        // Reset form after success
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                coverLetter: '',
                resume: null,
            });
            setSubmitStatus('idle');
        }, 3000);
    };

    const animationVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header with Back Button */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={animationVariants}
                    className="mb-6"
                >
                    <button
                        onClick={() => router.push('/careers')}
                        className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-4"
                    >
                        <MdArrowBack className="text-xl" />
                        <span>Back to Careers</span>
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Job Details */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={animationVariants}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-lg shadow-md p-6 mb-6"
                        >
                            {/* Job Title and Basic Info */}
                            <div className="mb-6">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <h1 className="text-3xl font-bold text-primary">
                                        {job.position}
                                    </h1>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        {job.type}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MdLocationOn className="text-primary text-xl" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MdWork className="text-primary text-xl" />
                                        <span>{job.department}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MdAttachMoney className="text-primary text-xl" />
                                        <span className="font-semibold text-primary">
                                            {job.salaryRange}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MdPeople className="text-primary text-xl" />
                                        <span>{job.vacancies} Vacancy/ies</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MdCalendarToday className="text-primary text-xl" />
                                        <span>Posted {getPostedAgo(job.postedDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <MdPeople className="text-primary text-xl" />
                                        <span>{job.applicants} Applicant/s</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                {job.description && (
                                    <div className="mb-6">
                                        <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                            <MdDescription className="text-2xl" />
                                            Job Description
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {job.description}
                                        </p>
                                    </div>
                                )}

                                {job.responsibilities && job.responsibilities.length > 0 && (
                                    <div className="mb-6">
                                        <h2 className="text-xl font-bold text-primary mb-3">
                                            Responsibilities
                                        </h2>
                                        <ul className="space-y-2">
                                            {job.responsibilities.map((resp, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-2 text-gray-700"
                                                >
                                                    <span className="text-primary mt-1">•</span>
                                                    <span>{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {job.requirements && job.requirements.length > 0 && (
                                    <div>
                                        <h2 className="text-xl font-bold text-primary mb-3">
                                            Requirements
                                        </h2>
                                        <ul className="space-y-2">
                                            {job.requirements.map((req, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-2 text-gray-700"
                                                >
                                                    <span className="text-primary mt-1">•</span>
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Application Form */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={animationVariants}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-lg shadow-md p-6 sticky top-4"
                        >
                            <h2 className="text-2xl font-bold text-primary mb-6">
                                Apply for this Position
                            </h2>

                            {submitStatus === 'success' ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                    <div className="text-green-600 mb-2">✓</div>
                                    <p className="text-green-700 font-semibold">
                                        Application Submitted Successfully!
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">
                                        We&apos;ll review your application and get back to you soon.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            <MdPerson className="inline mr-1" />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            <MdEmail className="inline mr-1" />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="john.doe@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            <MdPhone className="inline mr-1" />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="+63 9XX XXX XXXX"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="resume"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            <MdUploadFile className="inline mr-1" />
                                            Resume/CV *
                                        </label>
                                        <input
                                            type="file"
                                            id="resume"
                                            name="resume"
                                            required
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary"
                                        />
                                        {formData.resume && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {formData.resume.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="coverLetter"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Cover Letter
                                        </label>
                                        <textarea
                                            id="coverLetter"
                                            name="coverLetter"
                                            rows={5}
                                            value={formData.coverLetter}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                            placeholder="Tell us why you're a great fit for this position..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
};

export default JobDetailsClient;
