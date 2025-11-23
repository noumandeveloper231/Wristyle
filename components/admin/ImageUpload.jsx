import React, { useRef, useState } from 'react';
import { CloudUpload } from 'lucide-react';

/**
 * ImageUpload component
 * Props:
 *  - images: array of base64 strings (controlled)
 *  - onChange: callback(imagesArray) when images change
 *  - maxImages: optional limit of images
 */
export default function ImageUpload({ images = [], onChange, maxImages = 5 }) {
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFiles = async (files) => {
        const newImages = [];
        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (e) => reject(e);
                reader.readAsDataURL(file);
            });
            newImages.push(base64);
        }
        const combined = [...images, ...newImages].slice(0, maxImages);
        onChange && onChange(combined);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            await handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            await handleFiles(e.target.files);
        }
    };

    const removeImage = (index) => {
        const updated = images.filter((_, i) => i !== index);
        onChange && onChange(updated);
    };

    return (
        <div
            className={`border-2 border-dashed rounded-md p-4 text-center transition-colors ${dragActive ? 'border-primary bg-primary/5' : 'border-muted'}`}
            onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
            <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleChange}
            />
            <CloudUpload className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Drag & drop images here, or click to select (max {maxImages})</p>
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                    {images.map((src, idx) => (
                        <div key={idx} className="relative group">
                            <img src={src} alt={`preview-${idx}`} className="h-24 w-full object-cover rounded" />
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                className="absolute top-1 right-1 bg-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
