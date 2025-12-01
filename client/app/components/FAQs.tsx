'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQsPageProps {
  faqs: FAQ[];
}

const FAQsPage: React.FC<FAQsPageProps> = ({ faqs }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Split FAQs into two arrays for the two columns
  const leftColumnFaqs = faqs.filter((_, index) => index % 2 === 0);
  const rightColumnFaqs = faqs.filter((_, index) => index % 2 === 1);

  const toggleFaq = (id: number): void => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Enhanced FAQ Item component with gentler Framer Motion animations
  const FaqItem: React.FC<{ faq: FAQ }> = ({ faq }) => {
    const isOpen = openFaq === faq.id;

    return (
      <motion.div
        className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm mb-6 hover:shadow-md"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => toggleFaq(faq.id)}
          className={`container px-4 py-4 text-left flex justify-between items-center ${isOpen ? 'bg-gray-50' : 'hover:bg-gray-50'
            }`}
          aria-expanded={isOpen}
          aria-controls={`faq-content-${faq.id}`}
          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-primary font-medium text-sm md:text-base pr-4">
            {faq.question}
          </span>
          <motion.div
            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isOpen ? 'bg-primary' : 'bg-gray-200'
              }`}
            animate={{
              backgroundColor: isOpen
                ? 'var(--color-primary, #3b82f6)'
                : '#e5e7eb',
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.svg
              className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-gray-600'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.4, type: 'tween', ease: 'easeInOut' }}
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </motion.button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-content-${faq.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: 'easeInOut' },
                opacity: { duration: 0.3 },
              }}
            >
              <div className="px-4 py-4 bg-gray-50 text-sm md:text-base text-gray-700">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen w-full py-12 px-4 bg-white">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
        initial={{ opacity: 0.8, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Frequently Asked Questions
      </motion.h1>

      <div className="max-w-[80%] mx-auto">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left Column */}
          <motion.div
            className="w-full md:w-1/2 space-y-2"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {leftColumnFaqs.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="w-full md:w-1/2 space-y-2 mt-6 md:mt-0"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {rightColumnFaqs.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
