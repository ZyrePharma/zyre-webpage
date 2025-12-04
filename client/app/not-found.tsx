'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 px-4">
            <div className={`text-center max-w-2xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* 404 Number with Gradient */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-br from-zyre-blue to-zyre-red bg-clip-text text-transparent leading-none">
                        404
                    </h1>
                    <div className="absolute inset-0 bg-gradient-to-br from-zyre-blue/10 to-zyre-red/10 blur-3xl -z-10"></div>
                </div>

                {/* Error Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-zyre-blue mb-4">
                    Page Not Found
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. The page may have been moved or doesn&apos;t exist.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="group relative px-8 py-4 bg-gradient-to-r from-zyre-blue to-blue-700 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                        <span className="relative z-10">Go to Homepage</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-zyre-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="group px-8 py-4 border-2 border-zyre-blue text-zyre-blue font-semibold rounded-lg transition-all duration-300 hover:bg-zyre-blue hover:text-white hover:shadow-lg hover:scale-105"
                    >
                        Go Back
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-16 flex justify-center gap-8 opacity-50">
                    <div className="w-16 h-16 border-4 border-zyre-blue/30 rounded-lg rotate-12 animate-pulse"></div>
                    <div className="w-16 h-16 border-4 border-zyre-red/30 rounded-full -rotate-12 animate-pulse" style={{ animationDelay: '500ms' }}></div>
                    <div className="w-16 h-16 border-4 border-zyre-blue/30 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1000ms' }}></div>
                </div>
            </div>
        </div>
    );
}
