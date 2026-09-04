"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, loading } = useWishlist();
    const { addToCart } = useCart();

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading wishlist...</p>
            </div>
        );
    }

    if (wishlist.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-3xl font-playfair font-bold text-primary mb-4">Your Wishlist is Empty</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Browse our collection and save your favorite items to your wishlist.
                </p>
                <Link href="/shop" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-playfair font-bold text-primary mb-8 text-center">My Wishlist</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlist.map((item) => (
                    <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="relative h-64 bg-gray-100">
                            <img
                                src={(item.images && item.images.length > 0 ? item.images[0] : item.imageUrl) || "/images/placeholder.jpg"}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => removeFromWishlist(item.productId)}
                                className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                title="Remove from Wishlist"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-4">
                            <Link href={`/product/${item.slug}`}>
                                <h3 className="text-lg font-medium text-primary mb-2 hover:text-accent transition-colors line-clamp-1">
                                    {item.title}
                                </h3>
                            </Link>
                            <p className="text-lg font-bold text-primary mb-4">${item.price}</p>

                            <div className="flex gap-2">
                                <Link
                                    href={`/product/${item.slug}`}
                                    className="flex-1 text-center border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium"
                                >
                                    View Product
                                </Link>
                                <button
                                    onClick={() => addToCart({ _id: item.productId, ...item })}
                                    className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
                                >
                                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
