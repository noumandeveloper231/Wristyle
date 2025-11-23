import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Cart from "@/models/Cart";

// GET user's orders (or all orders for admin)
export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // Check if this is an admin request
        const { searchParams } = new URL(request.url);
        const isAdmin = searchParams.get('admin') === 'true';

        let orders;
        if (isAdmin) {
            // Return all orders for admin
            orders = await Order.find()
                .populate('user', 'name email')
                .populate('items.product', 'name imageUrl')
                .sort({ createdAt: -1 });
        } else {
            // Return user's own orders
            orders = await Order.find({ user: userId })
                .populate('items.product')
                .sort({ createdAt: -1 });
        }

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

// POST create new order
export async function POST(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const { items, totalAmount, shippingAddress } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        // Create order
        const order = await Order.create({
            user: userId,
            items,
            totalAmount,
            shippingAddress,
            status: 'processing',
        });

        // Clear cart after order
        await Cart.findOneAndUpdate(
            { user: userId },
            { items: [] }
        );

        await order.populate('items.product');

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
