"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
    const { cart, cartTotal, user, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState("");

    const [shippingInfo, setShippingInfo] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
    });

    useEffect(() => {
        if (!user) {
            toast.error("Please login to checkout");
            router.push("/login");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty");
            router.push("/shop");
        }

        // Fetch user profile to pre-fill form
        fetchUserProfile();
    }, [user, cart]);

    const fetchUserProfile = async () => {
        if (!user) return;

        try {
            const response = await fetch('/api/profile');
            if (response.ok) {
                const data = await response.json();
                const nameParts = data.name?.split(" ") || ["", ""];
                setShippingInfo({
                    firstName: nameParts[0] || "",
                    lastName: nameParts.slice(1).join(" ") || "",
                    address: data.address || "",
                    city: data.city || "",
                    postalCode: data.postalCode || "",
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to place order");
            return;
        }

        // Validate form
        if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode) {
            toast.error("Please fill in all shipping details");
            return;
        }

        setLoading(true);

        try {
            const shippingAddress = `${shippingInfo.firstName} ${shippingInfo.lastName}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}`;

            // Prepare order items
            const items = cart.map((item) => ({
                product: item._id || item.id,
                quantity: item.quantity,
                price: item.price,
            }));

            // Create order
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    totalAmount: cartTotal,
                    shippingAddress,
                }),
            });

            if (response.ok) {
                const order = await response.json();

                // Update user profile with shipping info
                await fetch('/api/profile', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
                        address: shippingInfo.address,
                        city: shippingInfo.city,
                        postalCode: shippingInfo.postalCode,
                    }),
                });

                setOrderId(order._id.slice(-8));
                setOrderComplete(true);
                toast.success("Order placed successfully!");
            } else {
                toast.error("Failed to place order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h1 className="text-4xl font-serif font-bold text-primary mb-4">
                        Order Confirmed!
                    </h1>
                    <p className="text-lg text-muted-foreground mb-2">
                        Thank you for your purchase!
                    </p>
                    <p className="text-muted-foreground mb-8">
                        Your order <span className="font-bold text-primary">#{orderId}</span> has been placed successfully.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => router.push("/profile")}
                            className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
                        >
                            View Orders
                        </button>
                        <button
                            onClick={() => router.push("/shop")}
                            className="bg-secondary text-primary px-8 py-3 rounded-md font-semibold border border-primary hover:bg-muted transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-serif font-bold text-primary mb-8 text-center">Checkout</h1>

            <form onSubmit={handlePlaceOrder}>
                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Form */}
                    <div className="w-full lg:w-2/3 space-y-8">
                        {/* Shipping Info */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-accent" /> Shipping Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.firstName}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                                        className="w-full px-4 py-2 border border-muted rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.lastName}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                                        className="w-full px-4 py-2 border border-muted rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">Address *</label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.address}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                        className="w-full px-4 py-2 border border-muted rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">City *</label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.city}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                        className="w-full px-4 py-2 border border-muted rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Postal Code *</label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingInfo.postalCode}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                                        className="w-full px-4 py-2 border border-muted rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-muted">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-accent" /> Payment Method
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 border border-primary bg-primary/5 rounded-md">
                                    <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-primary" />
                                    <span className="font-medium">Cash on Delivery</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-8">
                                    Pay with cash when your order is delivered to your doorstep.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-secondary p-8 rounded-lg border border-muted sticky top-24">
                            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Your Order</h2>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item._id || item.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
                                                {item.imageUrl && (
                                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-bold">{item.name}</p>
                                                <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-muted pt-4 space-y-2 mb-6">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-primary pt-2">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent text-accent-foreground py-4 rounded-md font-bold hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
