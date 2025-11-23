"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const { user, isLoaded } = useUser();
    const [loading, setLoading] = useState(true);

    // Fetch cart when user is loaded
    useEffect(() => {
        if (isLoaded) {
            if (user) {
                fetchCart();
            } else {
                setCart([]);
                setLoading(false);
            }
        }
    }, [user, isLoaded]);

    const fetchCart = async () => {
        try {
            const response = await fetch('/api/cart');
            if (response.ok) {
                const data = await response.json();
                // Transform MongoDB cart to match old format
                const formattedCart = data.items?.map(item => ({
                    id: item.product._id,
                    ...item.product,
                    quantity: item.quantity,
                })) || [];
                setCart(formattedCart);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product) => {
        if (!user) {
            toast.error("Please login to add items to cart");
            return;
        }

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product._id || product.id, quantity: 1 }),
            });

            if (response.ok) {
                const id = toast.loading("Adding to cart...");
                await fetchCart();
                toast.success("Added to cart", { id });
            } else {
                toast.error("Failed to add to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add to cart");
        }
    };

    const removeFromCart = async (productId) => {
        if (!user) return;

        try {
            const response = await fetch(`/api/cart?productId=${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const id = toast.loading("Deleting from Cart...");
                await fetchCart();
                toast.success("Removed from cart", { id });
            } else {
                toast.error("Failed to remove item");
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            toast.error("Failed to remove item");
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (!user || quantity < 1) return;

        try {
            const response = await fetch('/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity }),
            });

            if (response.ok) {
                const id = toast.loading("Updating quantity...");
                await fetchCart();
                toast.success("Quantity updated", { id });
            } else {
                toast.error("Failed to update quantity");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Failed to update quantity");
        }
    };

    const clearCart = async () => {
        if (!user) return;

        try {
            const response = await fetch('/api/cart', {
                method: 'DELETE',
            });

            if (response.ok) {
                const id = toast.loading("Clearing cart...");
                await fetchCart();
                toast.success("Cart cleared", { id });
                setCart([]);
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            user,
            loading: !isLoaded || loading
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
