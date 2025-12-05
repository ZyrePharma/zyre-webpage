'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import type * as L from 'leaflet';

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

// Utility function to convert 24-hour time to 12-hour format with AM/PM
const convertTo12Hour = (time: string): string => {
    // Handle cases like "9:00" or "09:00"
    const [hourStr, minute] = time.split(':');
    let hour = parseInt(hourStr, 10);

    const period = hour >= 12 ? 'PM' : 'AM';

    // Convert hour to 12-hour format
    if (hour === 0) {
        hour = 12; // Midnight
    } else if (hour > 12) {
        hour = hour - 12;
    }

    return `${hour}:${minute} ${period}`;
};

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
            : `${convertTo12Hour(current.open_time)} - ${convertTo12Hour(current.close_time)}`;

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


    return formatted;
};

const LocationMap = ({ locations, className = '' }: LocationMapProps) => {
    const [isMapEnlarged, setIsMapEnlarged] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [customIcon, setCustomIcon] = useState<L.DivIcon | null>(null);

    // Ensure component only renders maps on client-side after hydration
    useEffect(() => {
        setIsMounted(true);

        // Create custom icon only on client-side
        if (typeof window !== 'undefined') {
            import('leaflet').then((L) => {
                // Create a custom DivIcon with the logo in a circular pin
                const icon = L.divIcon({
                    className: 'custom-map-marker',
                    html: `
                    <div style="position: relative; width: 40px; height: 50px;">
                        <div style="
                            position: absolute;
                            top: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 40px;
                            height: 40px;
                            background: white;
                            border: 3px solid #00395c;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                        ">
                            <img src="/assets/zyre-logo.png" style="width: 28px; height: 28px; object-fit: contain;" />
                        </div>
                        <div style="
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 0;
                            height: 0;
                            border-left: 8px solid transparent;
                            border-right: 8px solid transparent;
                            border-top: 12px solid #00395c;
                        "></div>
                    </div>
                `,
                    iconSize: [40, 50],
                    iconAnchor: [20, 50],
                    popupAnchor: [0, -50],
                });

                setCustomIcon(icon);
            });
        }
    }, []);

    // Disable body scroll when map is enlarged
    useEffect(() => {
        if (isMapEnlarged) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMapEnlarged]);

    // Always center on Philippines (12.8797° N, 121.7740° E)
    const centerLat = 12.8797;
    const centerLng = 121.7740;
    const zoomLevel = 5; // Philippines view

    // Don't render map until mounted
    if (!isMounted) {
        return (
            <div className={`relative z-0 ${className}`}>
                <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden relative z-0 flex items-center justify-center bg-gray-100">
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
                <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden relative z-0">
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
                        {customIcon && locations.map((location, index) => {
                            // Only render marker if lat and lng are defined and not 0
                            if (!location.lat || !location.lng || location.lat === 0 || location.lng === 0) {
                                return null;
                            }
                            return (
                                <Marker key={index} position={[location.lat, location.lng]} icon={customIcon}>
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
                            );
                        })}
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

            {/* Office List Section */}
            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {locations.map((location, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm p-2 border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <h4 className="text-sm font-semibold text-primary mb-2">
                                {location.name}
                            </h4>
                            <p className="text-xs text-gray-600 mb-3">
                                {location.address}
                            </p>
                            {location.officeHours && location.officeHours.length > 0 && (
                                <div className="border-t border-gray-200 pt-3">
                                    <h5 className="text-sm font-semibold text-gray-800 mb-2">Office Hours:</h5>
                                    <div className="text-xs text-gray-600 space-y-0.5">
                                        {formatOfficeHours(location.officeHours).map((line, idx) => (
                                            <div key={idx}>{line}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
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
                                    {customIcon && locations.map((location, index) => {
                                        // Only render marker if lat and lng are defined and not 0
                                        if (!location.lat || !location.lng || location.lat === 0 || location.lng === 0) {
                                            return null;
                                        }
                                        return (
                                            <Marker key={index} position={[location.lat, location.lng]} icon={customIcon}>
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
                                        );
                                    })}
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
