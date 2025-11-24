export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

import cloudinary from "@/lib/cloudinary";

// GET all products
export async function GET(request) {
  console.time("GET /api/products");
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
  } finally {
    console.timeEnd("GET /api/products");
  }
}

// POST create new product (admin only)
export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const category = formData.get("category");
    const stock = parseInt(formData.get("stock")) || 0;
    const featured = formData.get("featured") === "true";
    const images = formData.getAll("images");

    if (!name || !description || isNaN(price) || !category) {
      return NextResponse.json(
        { error: "Missing required fields or invalid data" },
        { status: 400 }
      );
    }

    const uploadedImages = [];
    for (const image of images) {
      if (image instanceof File) {
        // Manual file validation (similar to Multer's fileFilter and limits)
        if (!image.type.startsWith('image/')) {
          return NextResponse.json(
            { error: `Invalid file type for ${image.name}. Only images are allowed.` },
            { status: 400 }
          );
        }
        if (image.size > 5 * 1024 * 1024) { // 5MB limit
          return NextResponse.json(
            { error: `File size too large for ${image.name}. Maximum 5MB allowed.` },
            { status: 400 }
          );
        }

        try {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const b64 = buffer.toString("base64");
          const dataUri = "data:" + image.type + ";base64," + b64;
          const cloudinaryResponse = await cloudinary.uploader.upload(dataUri, {
            folder: "wristyle_products",
          });
          uploadedImages.push(cloudinaryResponse.secure_url);
        } catch (cloudinaryError) {
          console.error("Cloudinary upload error for file", image.name, ":", cloudinaryError);
          return NextResponse.json(
            { error: `Failed to upload image ${image.name} to Cloudinary`, details: cloudinaryError.message },
            { status: 500 }
          );
        }
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images: uploadedImages,
      stock,
      featured,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    let errorMessage = "Failed to create product";
    let statusCode = 500;

    if (error.name === 'ValidationError') {
      errorMessage = error.message;
      statusCode = 400;
    } else if (error.code === 11000) {
      errorMessage = "Product with this name already exists.";
      statusCode = 409;
    }

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: statusCode }
    );
  }
}