import mongoose from 'mongoose';

export const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true
    },

    servers: {
        type: [String]
    },

    commands: {
        type: [String]
    }
});

export const Package = mongoose.model('Package', PackageSchema);