import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const DBconnect = async () => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log('MongoDB is already connected');
    return;
  }

  if (connectionState === 2) {
    console.log('MongoDB is connecting');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'Milk-Way',
      bufferCommands: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection error');
  }
};

export default DBconnect;
