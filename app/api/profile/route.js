import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// GET user profile
export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            // Create user profile if doesn't exist
            user = await User.create({ clerkId: userId });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

// PUT update user profile
export async function PUT(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const data = await request.json();

        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            data,
            { new: true, upsert: true, runValidators: true }
        );

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
