import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: false,
    },
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
