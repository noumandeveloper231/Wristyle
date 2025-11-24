import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Watches', 'Jewelry', 'Accessories'],
    },
    // Keep imageUrl for backward compatibility (first image)
    imageUrl: {
        type: String,
        required: false,
    },
    // New field: array of images (base64 or URLs)
    images: {
        type: [String],
        default: [],
    },
    stock: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
        index: true,
    },
}, {
    timestamps: true,
});

ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ category: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

