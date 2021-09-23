import mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },

    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    currency: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
});

export const Transaction = mongoose.model('Transaction', TransactionSchema);