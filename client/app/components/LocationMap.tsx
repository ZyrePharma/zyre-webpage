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

interface OfficeHour {
    day: 'Mon' | 'Tue' | 'Wed' | 'Th' | 'Fri' | 'Sat' | 'Sun';
    open_time: string;
    close_time: string;
    isClosed: boolean;
}

export interface MapLocation {
    lat?: number; // Optional - will be provided by server-side geocoding
    lng?: number; // Optional - will be provided by server-side geocoding
    name: string;
    address: string;
    officeHours?: OfficeHour[];
}

interface LocationMapProps {
    locations: MapLocation[];
    className?: string;
}

// Utility function to format office hours with smart day grouping
const formatOfficeHours = (hours?: OfficeHour[]): string[] => {
    if (!hours || hours.length === 0) return [];

    const dayOrder = ['Mon', 'Tue', 'Wed', 'Th', 'Fri', 'Sat', 'Sun'];
    const sortedHours = [...hours].sort((a, b) =>
        dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );

    const formatted: string[] = [];
    let i = 0;

    while (i < sortedHours.length) {
        const current = sortedHours[i];
        const timeStr = current.isClosed
            ? 'Closed'
            : `${current.open_time} - ${current.close_time}`;

        // Find consecutive days with the same hours
        let endIndex = i;
        while (
            endIndex + 1 < sortedHours.length &&
            sortedHours[endIndex + 1].isClosed === current.isClosed &&
            (!current.isClosed ?
                (sortedHours[endIndex + 1].open_time === current.open_time &&
                    sortedHours[endIndex + 1].close_time === current.close_time)
                : true) &&
            dayOrder.indexOf(sortedHours[endIndex + 1].day) === dayOrder.indexOf(sortedHours[endIndex].day) + 1
        ) {
            endIndex++;
        }

        // Format the day range
        const dayRange = i === endIndex
            ? current.day
            : `${current.day}-${sortedHours[endIndex].day}`;

        formatted.push(`${dayRange}: ${timeStr}`);
        i = endIndex + 1;
    }

    console.log(formatted)

    return formatted;
};

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
        officeHours?: OfficeHour[];
    }>;

    // Calculate center point between all valid locations
    // Default to Philippines center (12.8797° N, 121.7740° E) if no valid locations
    const centerLat =
        validLocations.length > 0
            ? validLocations.reduce((sum, loc) => sum + loc.lat, 0) /
            validLocations.length
            : 12.8797; // Philippines latitude
    const centerLng =
        validLocations.length > 0
            ? validLocations.reduce((sum, loc) => sum + loc.lng, 0) /
            validLocations.length
            : 121.7740; // Philippines longitude

    // Default zoom level: 6 for Philippines view, 5 for multiple locations
    const zoomLevel = validLocations.length === 0 ? 6 : 5;

    // Don't render map until mounted
    if (!isMounted) {
        return (
            <div className={`relative z-0 ${className}`}>
                <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden relative z-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Preparing map...</p>
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
                        zoom={zoomLevel}
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
                                    <div className="min-w-[200px]">
                                        <strong className="text-primary text-base">{location.name}</strong>
                                        <br />
                                        <span className="text-sm text-gray-600">{location.address}</span>
                                        {location.officeHours && location.officeHours.length > 0 && (
                                            <div className="mt-2 pt-2 border-t border-gray-200">
                                                <strong className="text-sm text-primary">Office Hours:</strong>
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {formatOfficeHours(location.officeHours).map((line, idx) => (
                                                        <div key={idx}>{line}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
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
                                    zoom={zoomLevel}
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
                                                <div className="min-w-[200px]">
                                                    <strong className="text-primary text-base">{location.name}</strong>
                                                    <br />
                                                    <span className="text-sm text-gray-600">{location.address}</span>
                                                    {location.officeHours && location.officeHours.length > 0 && (
                                                        <div className="mt-2 pt-2 border-t border-gray-200">
                                                            <strong className="text-sm text-primary">Office Hours:</strong>
                                                            <div className="text-xs text-gray-600 mt-1">
                                                                {formatOfficeHours(location.officeHours).map((line, idx) => (
                                                                    <div key={idx}>{line}</div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
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
