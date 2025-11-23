"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Filter, ChevronDown, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

const categories = ["All", "Watches", "Jewelry", "Accessories"];

export default function Shop() {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const category = useSearchParams().get("category");
    const [selectedCategory, setSelectedCategory] = useState(category || "All");
    const [sortBy, setSortBy] = useState("featured");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch all products once
    useEffect(() => {
        const fetchAllProducts = async () => {
            console.log("🔄 Fetching products...");
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/products');

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                console.log("✅ Products fetched successfully:", data?.length || 0, "items");
                setAllProducts(data || []);
                setProducts(data || []);
            } catch (err) {
                console.error("❌ Unexpected error:", err);
                setError("Failed to load products. Please try again.");
                setAllProducts([]);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    // Filter and sort locally
    useEffect(() => {
        let filtered = [...allProducts];

        // Category filter
        if (selectedCategory !== "All") {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        // Search filter
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sorting
        if (sortBy === "price-low") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            filtered.sort((a, b) => b.price - a.price);
        } else {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setProducts(filtered);
    }, [selectedCategory, searchQuery, sortBy, allProducts]);

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-4xl font-serif font-bold text-primary">
                    Shop Collection
                </h1>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-muted rounded-md focus:outline-none focus:border-primary"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-4 py-2 border border-muted rounded-md hover:border-primary transition-colors">
                                <Filter className="w-4 h-4" />
                                <span>{selectedCategory}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-muted rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className="block w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-muted rounded-md focus:outline-none focus:border-primary bg-transparent"
                        >
                            <option value="featured">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading products...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                        <p className="text-red-600 font-semibold mb-2">⚠️ Error Loading Products</p>
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && products.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No products found.</p>
                    <button
                        onClick={() => {
                            setSelectedCategory("All");
                            setSearchQuery("");
                        }}
                        className="mt-4 text-primary hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
