import mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },

    transactions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Transaction'
    }
})

export const Player = mongoose.model('Player', PlayerSchema);