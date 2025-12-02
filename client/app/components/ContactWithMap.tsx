'use client';

import ContactPage from './Contact';
import LocationMap, { MapLocation } from './LocationMap';
import { motion } from 'framer-motion';
interface ContactWithMapProps {
    offices: MapLocation[];
}

const ContactWithMap = ({ offices }: ContactWithMapProps) => {
    return (
        <div className="min-h-screen w-full bg-white py-12 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-center text-primary mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Contact Us
                </motion.h1>

                {/* Contact Form and Map in Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div>
                        <ContactPage />
                    </div>

                    {/* Location Map */}
                    <div className="bg-white p-8 border border-gray-300 rounded-2xl shadow-xl h-full relative z-0">
                        <LocationMap locations={offices} />
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
                </div>
            </div>
        </div>
    );
};

export default ContactWithMap;
