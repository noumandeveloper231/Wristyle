"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FileExclamationPoint } from "lucide-react";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/products?featured=true');
            if (response.ok) {
                const data = await response.json();
                setProducts(data.slice(0, 4));
            }
        } catch (error) {
            console.error("Error fetching featured products:", error);
        } finally {
            setLoading(false);
        }
    };

    if (products.length === 0) {
        return (
            <section className="py-20 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-4xl font-serif font-bold text-primary mb-4">
                            Featured Collection
                        </h2>
                        <div className="w-16 h-2 bg-primary rounded-full mx-auto mb-4"></div>
                        <p className="text-muted-foreground max-w-2xl mx-auto flex flex-col items-center gap-4 mt-10">
                            <FileExclamationPoint className="text-muted-foreground inline-block w-20 h-20 mr-2" />
                            We couldn't find any featured products. Please check back later.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-4xl font-serif font-bold text-primary mb-4">
                        Featured Collection
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover our handpicked selection of premium timepieces and jewelry
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
