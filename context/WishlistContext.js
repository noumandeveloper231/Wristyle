"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const { user, isLoaded } = useUser();
    const { openSignIn } = useClerk();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Fetch wishlist when user is loaded
    useEffect(() => {
        if (isLoaded) {
            if (user) {
                fetchWishlist();
            } else {
                setWishlist([]);
                setLoading(false);
            }
        }
    }, [user, isLoaded]);

    const fetchWishlist = async () => {
        try {
            const response = await fetch('/api/wishlist');
            if (response.ok) {
                const data = await response.json();
                setWishlist(data.wishlist.products || []);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleWishlist = async (product) => {
        if (!user) {
            toast.error("Login required to use wishlist");
            setTimeout(() => {
                router.push('/sign-in');
            }, 1000);
            return;
        }

        // Optimistic update
        const isInWishlist = wishlist.some(item => item.productId === product._id || item.productId === product.id);
        let newWishlist;

        if (isInWishlist) {
            newWishlist = wishlist.filter(item => item.productId !== (product._id || product.id));
            toast.success("Removed from wishlist");
        } else {
            newWishlist = [...wishlist, {
                productId: product._id || product.id,
                title: product.name || product.title,
                price: product.price,
                images: product.images || [product.imageUrl],
                slug: product._id || product.id, // Using ID as slug for now if slug is missing, adjust based on actual product data
                createdAt: new Date()
            }];
            toast.success("Added to wishlist");
        }
        setWishlist(newWishlist);

        try {
            const response = await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product._id || product.id,
                    title: product.name || product.title,
                    price: product.price,
                    images: product.images || [product.imageUrl],
                    slug: product._id || product.id // Ensure this matches your product schema
                }),
            });

            if (!response.ok) {
                // Revert on failure
                fetchWishlist();
                toast.error("Failed to update wishlist");
            } else {
                // Update with server response to ensure consistency
                const data = await response.json();
                setWishlist(data.wishlist.products);
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            fetchWishlist(); // Revert
            toast.error("Failed to update wishlist");
        }
    };

    const removeFromWishlist = async (productId) => {
        if (!user) return;

        // Optimistic update
        const newWishlist = wishlist.filter(item => item.productId !== productId);
        setWishlist(newWishlist);
        toast.success("Removed from wishlist");

        try {
            const response = await fetch(`/api/wishlist/remove/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                fetchWishlist();
                toast.error("Failed to remove from wishlist");
            } else {
                const data = await response.json();
                setWishlist(data.wishlist.products);
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            fetchWishlist();
            toast.error("Failed to remove from wishlist");
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.productId === productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            toggleWishlist,
            removeFromWishlist,
            isInWishlist,
            loading: !isLoaded || loading
        }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => useContext(WishlistContext);
