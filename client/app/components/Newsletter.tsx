'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter-subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to subscribe');
      }

      // Success
      setSubmitStatus('success');
      setEmail('');

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );

      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white text-center"
    >
      {submitStatus === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-4xl mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-2">
            Thank you for subscribing!
          </h3>
          <p className="text-lg opacity-90">
            We&apos;ll keep you updated with our latest news and insights.
          </p>
        </motion.div>
      ) : submitStatus === 'error' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-4xl mb-4">✕</div>
          <h3 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-lg opacity-90">
            {errorMessage || 'Please try again later.'}
          </p>
        </motion.div>
      ) : (
        <>
          <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
          <p className="text-base opacity-90 mb-4 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest insights from
            the pharmaceutical industry.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg text-white placeholder-gray-300 bg-transparent border-2 border-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border-2 border-white"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </motion.button>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default Newsletter;
