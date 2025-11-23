"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AddProduct() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "Watches",
        images: [],
        stock: "",
        featured: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (product.images.length === 0) {
            toast.error("Please upload at least one image");
            return;
        }

        setLoading(true);

        try {
            console.log(product);
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...product,
                    price: parseFloat(product.price),
                    stock: parseInt(product.stock) || 0,
                    imageUrl: product.images[0],
                }),
            });

            if (response.ok) {
                toast.success("Product added successfully!");
                router.push("/admin/products");
            } else {
                toast.error("Failed to add product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-600 mt-2">Create a new product listing</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl bg-white p-8 rounded-lg shadow-sm border border-gray-200">
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
                            required
                            rows={4}
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
                                required
                                step="0.01"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Stock</label>
                            <input
                                type="number"
                                value={product.stock}
                                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <select
                            required
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
                            onChange={(images) => setProduct({ ...product, images })}
                            maxImages={5}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={product.featured}
                            onChange={(e) => setProduct({ ...product, featured: e.target.checked })}
                            className="w-4 h-4"
                        />
                        <label htmlFor="featured" className="text-sm font-medium">Featured Product</label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-amber-600 text-white py-3 rounded-md font-bold hover:bg-amber-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Adding..." : "Add Product"}
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

