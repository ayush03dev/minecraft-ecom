import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    packages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }]
});

export const Category = mongoose.model('Category', CategorySchema);