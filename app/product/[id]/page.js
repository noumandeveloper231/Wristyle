"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    console.error("Error fetching product:", response.status);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    const images = product.images || [];

    console.log(images.length);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <ImageGallery images={images} />

                {/* Product Info */}
                <div>
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">{product.category}</span>
                    <h1 className="text-4xl font-serif font-bold text-primary mt-2 mb-4">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < (product.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                />
                            ))}
                        </div>
                        <span className="text-muted-foreground">({product.reviews_count || 0} reviews)</span>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-3xl font-bold text-primary">${product.price}</span>
                        {product.original_price && (
                            <span className="text-xl text-muted-foreground line-through">${product.original_price}</span>
                        )}
                        {product.discount && (
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">Save {product.discount}%</span>
                        )}
                    </div>

                    <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex items-center border border-muted rounded-md">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-muted transition-colors">-</button>
                            <span className="px-4 py-3 font-bold w-12 text-center">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-muted transition-colors">+</button>
                        </div>
                        <button
                            onClick={() => addToCart({ ...product, quantity })}
                            className="flex-1 bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" /> Add to Cart
                        </button>
                        <button className="p-3 border border-muted rounded-md hover:bg-muted transition-colors text-primary">
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-muted">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Truck className="w-8 h-8 text-accent" />
                            <span className="text-xs font-bold">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <ShieldCheck className="w-8 h-8 text-accent" />
                            <span className="text-xs font-bold">2 Year Warranty</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <RotateCcw className="w-8 h-8 text-accent" />
                            <span className="text-xs font-bold">30 Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
