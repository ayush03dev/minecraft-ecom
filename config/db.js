import mongoose from 'mongoose';

const connectDB = async () => {
    try {
         await mongoose.connect('mongodb+srv://ayush_03:lenny@cluster0.vudqd.mongodb.net/concordia', {
            useUnifiedTopology: true,
            useNewUrlParser: true})
         console.log('Connected to MongoDB')
    } catch (error) {
        console.error(`${error.message}`)
        process.exit(1)     
    }
}

export default connectDB;