import connectDB  from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        // Get date ranges
        const now = new Date();
        const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // User growth data (last 30 days)
        const userGrowth = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: last30Days }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Product growth data (last 30 days)
        const productGrowth = await Product.aggregate([
            {
                $match: {
                    createdAt: { $gte: last30Days }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Orders data (last 30 days)
        const ordersData = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: last30Days }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    count: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Recent statistics
        const recentStats = {
            newUsersLast7Days: await User.countDocuments({ createdAt: { $gte: last7Days } }),
            newProductsLast7Days: await Product.countDocuments({ createdAt: { $gte: last7Days } }),
            newOrdersLast7Days: await Order.countDocuments({ createdAt: { $gte: last7Days } }),
        };

        // Category breakdown
        const categoryBreakdown = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Order status breakdown
        const orderStatusBreakdown = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        return NextResponse.json({
            userGrowth,
            productGrowth,
            ordersData,
            recentStats,
            categoryBreakdown,
            orderStatusBreakdown,
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
