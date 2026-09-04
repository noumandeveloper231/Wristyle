import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

// GET user's cart
export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        return NextResponse.json(cart || { items: [] });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
    }
}

// POST add item to cart
export async function POST(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const { productId, quantity = 1 } = await request.json();

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        await cart.populate('items.product');

        return NextResponse.json(cart);
    } catch (error) {
        console.error("Error adding to cart:", error);
        return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
    }
}

// PUT update cart item quantity
export async function PUT(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const { productId, quantity } = await request.json();

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return NextResponse.json({ error: "Cart not found" }, { status: 404 });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }

            await cart.save();
            await cart.populate('items.product');
        }

        return NextResponse.json(cart);
    } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
    }
}

// DELETE remove item from cart or clear entire cart
export async function DELETE(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return NextResponse.json({ error: "Cart not found" }, { status: 404 });
        }

        if (productId) {
            // Remove specific item
            cart.items = cart.items.filter(
                item => item.product.toString() !== productId
            );
        } else {
            // Clear entire cart
            cart.items = [];
        }

        await cart.save();
        await cart.populate('items.product');

        return NextResponse.json(cart);
    } catch (error) {
        console.error("Error deleting from cart:", error);
        return NextResponse.json({ error: "Failed to delete from cart" }, { status: 500 });
    }
}
