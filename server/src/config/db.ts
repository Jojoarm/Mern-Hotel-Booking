import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log('Connected to DB');
  } catch (error) {
    console.log('Error Connecting to DB', error);
  }
};

export default connectDB;
