"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ImageGallery({ images = [] }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">No images available</p>
            </div>
        );
    }

    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    console.log(images[selectedIndex]);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden group">
                <Image
                    width={500}
                    height={500}
                    src={images[selectedIndex]}
                    alt={`Product ${selectedIndex + 1}`}
                    className="w-full h-full object-contain"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {selectedIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 0 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedIndex === index
                                    ? 'border-amber-600 scale-95'
                                    : 'border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
