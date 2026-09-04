"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
        >
            {/* Image */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                    src={(product.images && product.images.length > 0 ? product.images[0] : product.imageUrl) || "/images/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />


                {/* Badges */}
                {product.original_price && product.price < product.original_price && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                    </span>
                )}

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-2 bg-white rounded-full shadow-md hover:bg-accent hover:text-white transition-colors ${isInWishlist(product._id || product.id) ? "text-red-500" : ""}`}
                        title="Add to Wishlist"
                    >
                        <Heart className={`w-4 h-4 ${isInWishlist(product._id || product.id) ? "fill-current" : ""}`} />
                    </button>
                    <button
                        onClick={() => addToCart(product)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-accent hover:text-white transition-colors"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Details */}
            <div className="p-4">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{product.category}</div>
                <Link href={`/product/${product._id || product.id}`}>
                    <h3 className="text-lg font-medium text-primary mb-2 hover:text-accent transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3 h-3 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">(12)</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    {product.original_price && (
                        <span className="text-sm text-muted-foreground line-through">${product.original_price}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
