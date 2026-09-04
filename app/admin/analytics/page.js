"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StatCard from "@/components/admin/StatCard";
import { Users, Package, ShoppingBag, TrendingUp } from "lucide-react";

const COLORS = ['#d97706', '#059669', '#2563eb', '#dc2626'];

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await fetch('/api/admin/analytics');
            if (response.ok) {
                const data = await response.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Loading analytics...</p>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No analytics data available</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600 mt-2">Insights and trends for your store</p>
            </div>

            {/* Recent Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="New Users (7 Days)"
                    value={analytics.recentStats.newUsersLast7Days}
                    icon={Users}
                    description="Recently registered"
                />
                <StatCard
                    title="New Products (7 Days)"
                    value={analytics.recentStats.newProductsLast7Days}
                    icon={Package}
                    description="Recently added"
                />
                <StatCard
                    title="New Orders (7 Days)"
                    value={analytics.recentStats.newOrdersLast7Days}
                    icon={ShoppingBag}
                    description="Last week"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* User Growth Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">User Growth (30 Days)</h2>
                    {analytics.userGrowth.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analytics.userGrowth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="_id"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return `${date.getMonth() + 1}/${date.getDate()}`;
                                    }}
                                />
                                <YAxis />
                                <Tooltip
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    name="New Users"
                                    stroke="#d97706"
                                    strokeWidth={2}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                            No user data for the last 30 days
                        </div>
                    )}
                </div>

                {/* Product Growth Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Products Added (30 Days)</h2>
                    {analytics.productGrowth.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={analytics.productGrowth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="_id"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return `${date.getMonth() + 1}/${date.getDate()}`;
                                    }}
                                />
                                <YAxis />
                                <Tooltip
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                />
                                <Legend />
                                <Bar
                                    dataKey="count"
                                    name="New Products"
                                    fill="#059669"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                            No product data for the last 30 days
                        </div>
                    )}
                </div>

                {/* Orders Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Orders (30 Days)</h2>
                    {analytics.ordersData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analytics.ordersData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="_id"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return `${date.getMonth() + 1}/${date.getDate()}`;
                                    }}
                                />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip
                                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                    formatter={(value, name) => {
                                        if (name === 'Revenue') return `$${value.toFixed(2)}`;
                                        return value;
                                    }}
                                />
                                <Legend />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="count"
                                    name="Orders"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue"
                                    stroke="#059669"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                            No order data for the last 30 days
                        </div>
                    )}
                </div>

                {/* Category Breakdown */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Products by Category</h2>
                    {analytics.categoryBreakdown.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={analytics.categoryBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ _id, percent }) => `${_id}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {analytics.categoryBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                            No products available
                        </div>
                    )}
                </div>
            </div>

            {/* Order Status Breakdown */}
            {analytics.orderStatusBreakdown.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analytics.orderStatusBreakdown} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="_id" type="category" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" name="Orders" fill="#d97706" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
