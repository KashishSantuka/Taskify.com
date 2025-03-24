import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async () => {
   try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("MongoDB is successfully connected")
   }
catch (error) {
    console.log("Error connecting the database", error.message)
}
}

