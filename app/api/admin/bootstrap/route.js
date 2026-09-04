import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    let me = await User.findOne({ clerkId: userId });
    if (!me) me = await User.create({ clerkId: userId });
    me.isAdmin = true;
    await me.save();

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Bootstrap failed" }, { status: 500 });
  }
}
