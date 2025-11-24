import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// GET all products
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (featured === "true") {
      query.featured = true;
    }

    const products = await Product.find(query)
      .select('name description price original_price category images imageUrl stock featured createdAt')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create new product (admin only)
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      description,
      price,
      category,
      images,
      stock,
      featured,
    } = body;

    console.log('images', images);


    if (!name || !description || !price || !category || !images) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      category,
      images: Array.isArray(images) ? images : [],
      imageUrl: Array.isArray(images) && images.length > 0 ? images[0] : undefined,
      stock: parseInt(stock) || 0,
      featured: !!featured,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product", details: error.message },
      { status: 500 }
    );
  }
}