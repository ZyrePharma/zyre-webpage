'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand } from 'react-icons/fa';
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

export interface MapLocation {
    lat?: number; // Optional - will be provided by server-side geocoding
    lng?: number; // Optional - will be provided by server-side geocoding
    name: string;
    address: string;
}

interface LocationMapProps {
    locations: MapLocation[];
    className?: string;
}

const LocationMap = ({ locations, className = '' }: LocationMapProps) => {
    const [isMapEnlarged, setIsMapEnlarged] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Ensure component only renders maps on client-side after hydration
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Filter locations that have coordinates (with safety check for undefined locations)
    const validLocations = (locations || []).filter(
        (loc) => loc.lat !== undefined && loc.lng !== undefined
    ) as Array<{
        lat: number;
        lng: number;
        name: string;
        address: string;
    }>;

    // Calculate center point between all valid locations
    const centerLat =
        validLocations.length > 0
            ? validLocations.reduce((sum, loc) => sum + loc.lat, 0) /
            validLocations.length
            : 0;
    const centerLng =
        validLocations.length > 0
            ? validLocations.reduce((sum, loc) => sum + loc.lng, 0) /
            validLocations.length
            : 0;

    // Don't render map until mounted or if no valid locations
    if (!isMounted || validLocations.length === 0) {
        return (
            <div className={`relative z-0 ${className}`}>
                <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden relative z-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        {!isMounted ? (
                            <>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-gray-600">Preparing map...</p>
                            </>
                        ) : (
                            <p className="text-gray-600">No office locations available</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={`relative z-0 ${className}`}>
                <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden relative z-0">
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
                        {validLocations.map((location, index) => (
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
                </div>
                <button
                    onClick={() => setIsMapEnlarged(true)}
                    className="absolute top-2 right-2 bg-white hover:bg-gray-100 p-2 rounded-lg shadow-md transition-colors z-10"
                    aria-label="Enlarge map"
                >
                    <FaExpand className="text-primary" />
                </button>
            </div>

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
                                    {validLocations.map((location, index) => (
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
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default LocationMap;
