import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL;
    await mongoose.connect(mongoURL as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
