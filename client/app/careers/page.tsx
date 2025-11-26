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

const CareersPage = () => {
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
  const jobListings = [
    {
      id: 1,
      title: 'Pharmaceutical Sales Representative',
      type: 'Full Time',
      category: 'Sales & Marketing',
      location: 'Laoag City, Ilocos Norte',
      vacancies: 1,
      salaryRange: '₱14,000.00 - ₱16,000.00',
      postedAgo: '2 months ago',
      applicants: 0,
    },
    {
      id: 2,
      title: 'Medical Sales Specialist',
      type: 'Full Time',
      category: 'Sales & Marketing',
      location: 'Cebu City, Cebu',
      vacancies: 2,
      salaryRange: '₱18,000.00 - ₱20,000.00',
      postedAgo: '1 month ago',
      applicants: 5,
    },
    {
      id: 3,
      title: 'Territory Manager',
      type: 'Part Time',
      category: 'Sales & Marketing',
      location: 'Davao City, Davao del Sur',
      vacancies: 1,
      salaryRange: '₱20,000.00 - ₱25,000.00',
      postedAgo: '3 weeks ago',
      applicants: 3,
    },
    {
      id: 4,
      title: 'Hospital Account Executive',
      type: 'Full Time',
      category: 'Sales & Marketing',
      location: 'Quezon City, Metro Manila',
      vacancies: 3,
      salaryRange: '₱22,000.00 - ₱28,000.00',
      postedAgo: '2 weeks ago',
      applicants: 10,
    },
    {
      id: 5,
      title: 'Pharma Business Development Officer',
      type: 'Contract',
      category: 'Business Development',
      location: 'Pasig City, Metro Manila',
      vacancies: 2,
      salaryRange: '₱30,000.00 - ₱35,000.00',
      postedAgo: '1 week ago',
      applicants: 2,
    },
    {
      id: 6,
      title: 'Clinical Research Associate',
      type: 'Full Time',
      category: 'Research & Development',
      location: 'Taguig City, Metro Manila',
      vacancies: 1,
      salaryRange: '₱40,000.00 - ₱50,000.00',
      postedAgo: '5 days ago',
      applicants: 7,
    },
    {
      id: 7,
      title: 'Regulatory Affairs Officer',
      type: 'Full Time',
      category: 'Regulatory',
      location: 'Makati City, Metro Manila',
      vacancies: 2,
      salaryRange: '₱28,000.00 - ₱32,000.00',
      postedAgo: '4 days ago',
      applicants: 4,
    },
    {
      id: 8,
      title: 'Pharmaceutical Marketing Assistant',
      type: 'Part Time',
      category: 'Marketing',
      location: 'Cagayan de Oro, Misamis Oriental',
      vacancies: 1,
      salaryRange: '₱15,000.00 - ₱18,000.00',
      postedAgo: '6 days ago',
      applicants: 1,
    },
    {
      id: 9,
      title: 'Medical Affairs Coordinator',
      type: 'Full Time',
      category: 'Medical Affairs',
      location: 'Iloilo City, Iloilo',
      vacancies: 1,
      salaryRange: '₱25,000.00 - ₱30,000.00',
      postedAgo: '1 month ago',
      applicants: 0,
    },
    {
      id: 10,
      title: 'Pharmaceutical Product Manager',
      type: 'Full Time',
      category: 'Product Management',
      location: 'Baguio City, Benguet',
      vacancies: 1,
      salaryRange: '₱50,000.00 - ₱60,000.00',
      postedAgo: '3 weeks ago',
      applicants: 6,
    },
    {
      id: 11,
      title: 'Quality Assurance Specialist',
      type: 'Full Time',
      category: 'Quality Assurance',
      location: 'General Santos City, South Cotabato',
      vacancies: 2,
      salaryRange: '₱27,000.00 - ₱33,000.00',
      postedAgo: '2 weeks ago',
      applicants: 2,
    },
    {
      id: 12,
      title: 'Warehouse Pharmacist',
      type: 'Full Time',
      category: 'Logistics',
      location: 'Cavite City, Cavite',
      vacancies: 1,
      salaryRange: '₱18,000.00 - ₱22,000.00',
      postedAgo: '5 days ago',
      applicants: 1,
    },
  ];

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

  const salesMarketingBenefits = [
    { Icon: HiCurrencyDollar, text: 'Competitive Industry Salary' },
    { Icon: MdLocalHospital, text: 'In-house HMO' },
    { Icon: MdAttachMoney, text: 'Commission On-Target' },
    { Icon: BsSend, text: 'Actual Transportation Allowance' },
    {
      Icon: MdDirectionsCar,
      text: 'Company Car',
      subtext: '(upon consistently hitting targets)',
    },
    { Icon: MdFlightTakeoff, text: 'Travel Abroad' },
  ];

  const generalBenefits = [
    { Icon: HiCurrencyDollar, text: 'Competitive Industry Salary' },
    { Icon: MdLocalHospital, text: 'In-house HMO' },
  ];

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
            <span className="font-bold text-primary">life matters</span>.
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
          {/* Sales and Marketing Benefits */}
          <motion.div
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
                  <FaHandshake className="text-4xl text-primary" />
                  <div className="absolute inset-0 text-primary animate-pulse opacity-20" />
                </motion.div>
                <h3 className="text-2xl font-bold text-primary">
                  Sales and Marketing
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {salesMarketingBenefits.map((item, index) => (
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
                      <item.Icon className="text-2xl text-primary flex-shrink-0 mt-1" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.text}</p>
                      {item.subtext && (
                        <p className="text-sm text-gray-600 mt-1">
                          {item.subtext}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* General Positions Benefits */}
          <motion.div
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
                  <MdHealthAndSafety className="text-4xl text-primary" />
                  <div className="absolute inset-0 text-primary animate-pulse opacity-20" />
                </motion.div>
                <h3 className="text-2xl font-bold text-primary">
                  General Positions
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {generalBenefits.map((item, index) => (
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
                      <item.Icon className="text-2xl text-primary flex-shrink-0 mt-1" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
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
          {jobListings.map((job, index) => (
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

export default CareersPage;
