'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';



const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white p-8 border border-gray-300 rounded-2xl shadow-xl">
      {submitted && (
        <motion.div
          className="mb-6 flex items-center gap-2 text-green-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaCheckCircle className="w-5 h-5" />
          <span>Form submitted! We'll contact you soon.</span>
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
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition text-gray-600"
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
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition text-gray-600"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-medium shadow hover:bg-[var(--color-blue-700)] transition"
        >
          Send Message
        </motion.button>
      </form>
    </div>
  );
};

export default ContactPage;
