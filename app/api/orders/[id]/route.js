import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

// PATCH - Update order status
export async function PATCH(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const { status } = await request.json();

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate('items.product');

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
        );
    }
}

// GET single order
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const order = await Order.findById(id)
            .populate('user', 'name email')
            .populate('items.product');

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            { error: 'Failed to fetch order' },
            { status: 500 }
        );
    }
}
