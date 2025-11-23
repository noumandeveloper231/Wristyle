"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Users, DollarSign, ShoppingBag, TrendingUp, ArrowRight } from "lucide-react";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0,
        revenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    title="Total Products"
                    value={loading ? "-" : stats.products}
                    icon={Package}
                    description={`${stats.products} active products`}
                />
                <StatCard
                    title="Total Orders"
                    value={loading ? "-" : stats.orders}
                    icon={ShoppingBag}
                    description="All time orders"
                />
                <StatCard
                    title="Total Users"
                    value={loading ? "-" : stats.users}
                    icon={Users}
                    description="Registered users"
                />
                <StatCard
                    title="Total Revenue"
                    value={loading ? "-" : `$${stats.revenue.toFixed(2)}`}
                    icon={DollarSign}
                    description="All time revenue"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/admin/products"
                    className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:border-amber-600 hover:shadow-md transition-all flex flex-col items-center text-center group"
                >
                    <Package className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Products</h3>
                    <p className="text-gray-600 mb-4">View, edit, and delete products</p>
                    <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                    href="/admin/orders"
                    className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:border-amber-600 hover:shadow-md transition-all flex flex-col items-center text-center group"
                >
                    <ShoppingBag className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">View Orders</h3>
                    <p className="text-gray-600 mb-4">Manage customer orders</p>
                    <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                    href="/admin/analytics"
                    className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:border-amber-600 hover:shadow-md transition-all flex flex-col items-center text-center group"
                >
                    <TrendingUp className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics</h3>
                    <p className="text-gray-600 mb-4">View detailed insights</p>
                    <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
