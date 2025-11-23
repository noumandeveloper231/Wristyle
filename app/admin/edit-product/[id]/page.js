"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditProduct() {
    const router = useRouter();
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "Watches",
        images: [],
        stock: "",
        featured: false,
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch existing product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) throw new Error("Failed to fetch product");
                const data = await res.json();
                setProduct({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price?.toString() || "",
                    category: data.category || "Watches",
                    images: data.images || [],
                    stock: data.stock?.toString() || "",
                    featured: data.featured || false,
                });
            } catch (error) {
                console.error(error);
                toast.error("Unable to load product");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product.images.length === 0) {
            toast.error("Please upload at least one image");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...product,
                    price: parseFloat(product.price),
                    stock: parseInt(product.stock) || 0,
                    imageUrl: product.images[0], // backward compatibility
                }),
            });
            if (res.ok) {
                toast.success("Product updated successfully");
                router.push("/admin/products");
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to update product");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating product");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-8">Edit Product</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Product Name *</label>
                        <input
                            type="text"
                            required
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Description *</label>
                        <textarea
                            rows={4}
                            required
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-600"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Price *</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Stock *</label>
                            <input
                                type="number"
                                required
                                value={product.stock}
                                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-600"
                        >
                            <option value="Watches">Watches</option>
                            <option value="Jewelry">Jewelry</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Product Images *</label>
                        <ImageUpload
                            images={product.images}
                            onChange={(imgs) => setProduct({ ...product, images: imgs })}
                            maxImages={5}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={product.featured}
                                onChange={(e) => setProduct({ ...product, featured: e.target.checked })}
                                className="mr-2"
                            />
                            Featured
                        </label>
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-amber-600 text-white py-3 rounded-md font-bold hover:bg-amber-700 transition-colors disabled:opacity-50"
                        >
                            {submitting ? "Updating..." : "Update Product"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/admin/products")}
                            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md font-bold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
