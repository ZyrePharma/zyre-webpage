'use client';

import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import Newsletter from '../components/Newsletter';
import {
    MdHealthAndSafety,
    MdLocalHospital,
    MdAttachMoney,
    MdDirectionsCar,
    MdFlightTakeoff,
} from 'react-icons/md';
import { FaHandshake } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import { BsSend } from 'react-icons/bs';
import { motion } from 'motion/react';
import { useInViewport } from '../hooks/useInViewport';
import { JobListing, ZyreBenefit } from '../types';

interface CareersPageClientProps {
    jobListings: JobListing[];
    benefits: ZyreBenefit[];
}

// Icon mapping for benefits
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'HiCurrencyDollar': HiCurrencyDollar,
    'MdLocalHospital': MdLocalHospital,
    'MdAttachMoney': MdAttachMoney,
    'BsSend': BsSend,
    'MdDirectionsCar': MdDirectionsCar,
    'MdFlightTakeoff': MdFlightTakeoff,
    'FaHandshake': FaHandshake,
    'MdHealthAndSafety': MdHealthAndSafety,
};

const CareersPageClient: React.FC<CareersPageClientProps> = ({ jobListings, benefits }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [missionInView, missionRef] = useInViewport(0.2);
    const [benefitsInView, benefitsRef] = useInViewport(0.2);
    const [jobsInView, jobsRef] = useInViewport(0.2);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Cast refs to work with motion components
    const missionDivRef = missionRef as React.RefObject<HTMLDivElement>;
    const benefitsDivRef = benefitsRef as React.RefObject<HTMLDivElement>;
    const jobsDivRef = jobsRef as React.RefObject<HTMLDivElement>;

    // Mission section is above the fold - animate immediately on load
    // Other sections wait for viewport intersection
    const shouldAnimateMission = isLoaded;
    const shouldAnimateBenefits = isLoaded && benefitsInView;
    const shouldAnimateJobs = isLoaded && jobsInView;

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    // Transform job listings for JobCard component
    const transformedJobs = jobListings.map((job) => ({
        id: job.slug || job.documentId, // Use slug for SEO-friendly URLs, fallback to documentId
        title: job.position,
        type: job.type,
        category: job.department,
        location: job.location,
        vacancies: job.vacancies,
        salaryRange: job.salaryRange,
        postedAgo: getPostedAgo(job.postedDate),
        applicants: job.applicants,
    }));


    return (
        <div className="w-full min-h-screen px-4 py-8 max-w-7xl mx-auto">
            {/* Mission & Vision Section */}
            <motion.div
                ref={missionDivRef}
                initial="hidden"
                animate={shouldAnimateMission ? 'visible' : 'hidden'}
                variants={fadeInUp}
                className="mb-16 text-center"
            >
                <motion.h1
                    className="text-5xl md:text-6xl font-bold text-primary mb-6"
                    variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.6, delay: 0.2 },
                        },
                    }}
                >
                    Career Opportunities
                </motion.h1>
                <div className="max-w-3xl mx-auto">
                    <motion.p
                        className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed"
                        variants={fadeInUp}
                    >
                        We are looking for awesome people to join our team in making the
                        life of the Filipinos better through medicine. Sharing our common
                        vision and belief that{' '}
                        <span className="font-bold text-zyre-red">life matters</span>.
                    </motion.p>
                    <motion.p
                        className="text-base md:text-lg text-gray-600 leading-relaxed"
                        variants={fadeInUp}
                    >
                        You will be a part of our mission to enhance the Filipino quality of
                        life through yet cost-effective pharmaceutical products that our
                        company gives.
                    </motion.p>
                </div>
            </motion.div>

            {/* Why Join Zyre Section */}
            <motion.div
                ref={benefitsDivRef}
                initial="hidden"
                animate={shouldAnimateBenefits ? 'visible' : 'hidden'}
                variants={fadeInUp}
                className="mb-16"
            >
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6 },
                        },
                    }}
                >
                    Why Join Zyre?
                </motion.h2>

                <motion.div
                    className="grid md:grid-cols-2 gap-8 md:gap-10 mt-8"
                    variants={staggerContainer}
                >
                    {benefits.map((benefitGroup, groupIndex) => {
                        // Determine icon for the department
                        const DepartmentIcon = benefitGroup.department.toLowerCase().includes('sales')
                            ? FaHandshake
                            : MdHealthAndSafety;

                        return (
                            <motion.div
                                key={benefitGroup.id}
                                variants={cardVariants}
                                className="group relative bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8 rounded-2xl border-2 border-primary shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className="relative"
                                        >
                                            <DepartmentIcon className="text-4xl text-primary" />
                                            <div className="absolute inset-0 text-primary animate-pulse opacity-20" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-primary">
                                            {benefitGroup.department}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {benefitGroup.benefits.map((item, index) => {
                                            // Get icon component from icon name or use default
                                            const IconComponent = item.icon ? iconMap[item.icon] || HiCurrencyDollar : HiCurrencyDollar;

                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                                                    className="flex items-start gap-3 group/item hover:bg-white/50 p-2 rounded-lg transition-colors"
                                                >
                                                    <motion.div
                                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <IconComponent className="text-2xl text-primary flex-shrink-0 mt-1" />
                                                    </motion.div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                                        {item.subtext && (
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {item.subtext}
                                                            </p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>

            {/* Job Listings Section */}
            <motion.div
                ref={jobsDivRef}
                initial="hidden"
                animate={shouldAnimateJobs ? 'visible' : 'hidden'}
                variants={fadeInUp}
                className="mb-12"
            >
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6 },
                        },
                    }}
                >
                    Available Positions
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
                    variants={staggerContainer}
                >
                    {transformedJobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate={shouldAnimateJobs ? 'visible' : 'hidden'}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <JobCard job={job} />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-16"
            >
                <Newsletter />
            </motion.div>
        </div>
    );
};

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

export default CareersPageClient;
