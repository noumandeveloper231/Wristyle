import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Wishlist from '@/models/Wishlist';

export async function POST(req) {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { productId, title, price, images, slug } = await req.json();

        if (!productId || !title || !price || !slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let wishlist = await Wishlist.findOne({ userId: user.id });

        if (!wishlist) {
            wishlist = new Wishlist({
                userId: user.id,
                products: [],
            });
        }

        const productIndex = wishlist.products.findIndex(p => p.productId === productId);

        let isAdded = false;

        if (productIndex > -1) {
            // Remove from wishlist
            wishlist.products.splice(productIndex, 1);
        } else {
            // Add to wishlist
            wishlist.products.push({
                productId,
                title,
                price,
                images,
                slug,
                createdAt: new Date(),
            });
            isAdded = true;
        }

        await wishlist.save();

        return NextResponse.json({ wishlist, isAdded }, { status: 200 });

    } catch (error) {
        console.error("Error toggling wishlist:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const wishlist = await Wishlist.findOne({ userId: user.id });

        return NextResponse.json({ wishlist: wishlist || { products: [] } }, { status: 200 });

    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
