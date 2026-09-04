import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            images: {
                type: [String],
                default: [],
            },
            slug: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ]
}, {
    timestamps: true,
});

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
