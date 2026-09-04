import  connectDB  from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        const [products, orders, users] = await Promise.all([
            Product.countDocuments(),
            Order.countDocuments(),
            User.countDocuments(),
        ]);

        // Calculate total revenue
        const orderStats = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' },
                },
            },
        ]);

        const revenue = orderStats.length > 0 ? orderStats[0].totalRevenue : 0;

        return NextResponse.json({
            products,
            orders,
            users,
            revenue,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
