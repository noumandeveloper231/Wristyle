import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// GET single product by ID
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        console.log('params', params);
        console.log('id', id);

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 },
                id 
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

// PUT update product
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const body = await request.json();

        const product = await Product.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
        );
    }
}

// DELETE product
export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const product = await Product.findByIdAndDelete(params.id);

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 500 }
        );
    }
}
