import Image from 'next/image';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50">
            <div className="text-center">
                {/* Animated Logo */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    {/* Outer rotating ring */}
                    <div className="absolute inset-0 border-4 border-transparent border-t-zyre-blue border-r-zyre-red rounded-full animate-spin"></div>

                    {/* Inner pulsing circle */}
                    <div className="absolute inset-4 bg-gradient-to-br from-zyre-blue to-zyre-red rounded-full opacity-20 animate-pulse"></div>

                    {/* Center Zyre Logo */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="relative w-full h-full">
                            <Image
                                src="/assets/zyre-logo.png"
                                alt="Zyre Pharmaceuticals"
                                fill
                                className="object-contain animate-pulse"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <h2 className="text-2xl font-bold text-zyre-blue mb-2">
                    Loading
                </h2>
                <p className="text-gray-600 animate-pulse">
                    Please wait...
                </p>

                {/* Animated Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    <div className="w-3 h-3 bg-zyre-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-zyre-red rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-zyre-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
}
