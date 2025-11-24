import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { productId } = await params;

        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const wishlist = await Wishlist.findOne({ userId: user.id });

        if (!wishlist) {
            return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
        }

        wishlist.products = wishlist.products.filter(p => p.productId !== productId);

        await wishlist.save();

        return NextResponse.json({ wishlist }, { status: 200 });

    } catch (error) {
        console.error("Error removing from wishlist:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
