import mongoose from 'mongoose';



const connectMongoose = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set.');
      }

    mongoose.connect(process.env.MONGODB_URI)
};
export default connectMongoose;