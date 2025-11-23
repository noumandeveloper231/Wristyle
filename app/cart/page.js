"use client";

import Link from "next/link";
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, cartTotal, loading, user } = useCart();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-serif font-bold text-primary mb-4">Please Log In</h1>
                <p className="text-muted-foreground mb-8">You need to be logged in to view your cart.</p>
                <Link
                    href="/login"
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    Log In
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-secondary p-6 rounded-full text-primary">
                        <ShoppingBag className="w-12 h-12" />
                    </div>
                </div>
                <h1 className="text-3xl font-serif font-bold text-primary mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added anything yet.</p>
                <Link
                    href="/shop"
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-8">Your Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white rounded-lg shadow-sm border border-muted overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-secondary text-left">
                                <tr>
                                    <th className="p-4 font-bold text-primary">Product</th>
                                    <th className="p-4 font-bold text-primary">Price</th>
                                    <th className="p-4 font-bold text-primary">Quantity</th>
                                    <th className="p-4 font-bold text-primary">Total</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id} className="border-b border-muted last:border-0">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                                    {item.image_url ? (
                                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                            <ShoppingBag className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-primary line-clamp-1">{item.name}</h3>
                                                    <p className="text-xs text-muted-foreground">{item.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-muted-foreground">${item.price}</td>
                                        <td className="p-4">
                                            <div className="flex items-center border border-muted rounded-md w-fit">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:bg-muted disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="px-2 py-1 text-sm font-bold w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-muted"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-secondary p-8 rounded-lg border border-muted sticky top-24">
                        <h2 className="text-2xl font-serif font-bold text-primary mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t border-muted pt-4 flex justify-between font-bold text-lg text-primary">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-md font-bold hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-2"
                        >
                            Proceed to Checkout <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
