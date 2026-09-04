import React, { useRef, useState, useEffect } from 'react';
import { CloudUpload } from 'lucide-react';

/**
 * ImageUpload component
 * Props:
 *  - images: array of File objects (controlled)
 *  - onChange: callback(imagesArray) when images change
 *  - maxImages: optional limit of images
 */
export default function ImageUpload({ images = [], onChange, maxImages = 5 }) {
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [previewUrls, setPreviewUrls] = useState([]);

    useEffect(() => {
        const urls = images.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [images]);

    const handleFiles = (files) => {
        const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        const combined = [...images, ...newFiles].slice(0, maxImages);
        onChange && onChange(combined);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
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
            {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                    {previewUrls.map((url, idx) => (
                        <div key={idx} className="relative group">
                            <img src={url} alt={`preview-${idx}`} className="h-24 w-full object-cover rounded" />
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
