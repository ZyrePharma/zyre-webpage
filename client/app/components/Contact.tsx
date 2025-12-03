'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

interface FormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formState.error) {
      setFormState((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set loading state
    setFormState({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to submit message');
      }

      // Success
      setFormState({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, success: false }));
      }, 5000);

    } catch (error) {
      console.error('Contact form submission error:', error);
      setFormState({
        loading: false,
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  return (
    <div className="bg-white p-8 border border-gray-300 rounded-2xl shadow-xl">
      {/* Success Message */}
      {formState.success && (
        <motion.div
          className="mb-6 flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg border border-green-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>Message sent successfully! We'll get back to you soon.</span>
        </motion.div>
      )}

      {/* Error Message */}
      {formState.error && (
        <motion.div
          className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaExclamationCircle className="w-5 h-5 flex-shrink-0" />
          <span>{formState.error}</span>
        </motion.div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {['name', 'email', 'subject'].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium capitalize text-primary"
            >
              {field}
            </label>
            <input
              id={field}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition text-primary"
              required
            />
          </div>
        ))}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-primary"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition text-primary"
            required
          />
        </div>
        <motion.button
          whileHover={!formState.loading ? { scale: 1.05 } : {}}
          whileTap={!formState.loading ? { scale: 0.95 } : {}}
          type="submit"
          disabled={formState.loading}
          className="w-full bg-primary text-white py-2 rounded-lg font-medium shadow hover:bg-[var(--color-blue-700)] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {formState.loading ? (
            <div className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              <span>Sending...</span>
            </div>
          ) : (
            <span>Send Message</span>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ContactPage;
