'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExpand } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Dynamically import Map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMapEnlarged, setIsMapEnlarged] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders maps on client-side after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Coordinates for the two locations (you can customize these)
  const locations = [
    {
      lat: 28.6139,
      lng: 77.209,
      name: 'Main Office',
      address: 'New Delhi, India',
    },
    {
      lat: 19.076,
      lng: 72.8777,
      name: 'Branch Office',
      address: 'Mumbai, India',
    },
  ];

  // Center point between the two locations
  const centerLat = (locations[0].lat + locations[1].lat) / 2;
  const centerLng = (locations[0].lng + locations[1].lng) / 2;

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
    <div className="min-h-screen w-full bg-white py-12 px-4 md:px-12">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-primary mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h1>

      <div className="max-w-[80%]  mx-auto flex flex-col md:flex-row gap-10">
        <motion.div
          className="w-full md:w-1/2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white p-8 border border-gray-300 rounded-2xl shadow-xl">
            {submitted && (
              <motion.div
                className="mb-6 flex items-center gap-2 text-green-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaCheckCircle className="w-5 h-5" />
                <span>Form submitted! We’ll contact you soon.</span>
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
        </motion.div>

        <motion.div
          className="w-full md:w-1/2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white p-8 border border-gray-300 rounded-2xl shadow-xl h-full relative z-0">
            <div className="relative z-0">
              <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden relative z-0">
                {isMounted && (
                  <MapContainer
                    key="small-map"
                    center={[centerLat, centerLng]}
                    zoom={5}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations.map((location, index) => (
                      <Marker key={index} position={[location.lat, location.lng]}>
                        <Popup>
                          <div>
                            <strong>{location.name}</strong>
                            <br />
                            {location.address}
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>
              <button
                onClick={() => setIsMapEnlarged(true)}
                className="absolute top-2 right-2 bg-white hover:bg-gray-100 p-2 rounded-lg shadow-md transition-colors z-10"
                aria-label="Enlarge map"
              >
                <FaExpand className="text-primary" />
              </button>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-primary mb-2">
                Business Hours
              </h2>
              <div className="text-sm text-gray-500 grid grid-cols-2 gap-y-1">
                <span>Mon - Fri:</span>
                <span>9:00 AM - 6:00 PM</span>
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enlarged Map Modal */}
        <AnimatePresence>
          {isMapEnlarged && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4">
              <motion.div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] relative z-[10000]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setIsMapEnlarged(false)}
                  className="absolute top-4 right-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg z-[10001] transition-colors"
                  aria-label="Close map"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="h-full w-full rounded-2xl overflow-hidden">
                  {isMapEnlarged && (
                    <MapContainer
                      key="enlarged-map"
                      center={[centerLat, centerLng]}
                      zoom={5}
                      style={{ height: '100%', width: '100%' }}
                      scrollWheelZoom={true}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {locations.map((location, index) => (
                        <Marker
                          key={index}
                          position={[location.lat, location.lng]}
                        >
                          <Popup>
                            <div>
                              <strong>{location.name}</strong>
                              <br />
                              {location.address}
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactPage;
