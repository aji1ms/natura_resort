import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string, {});
        console.log("DB connected");
    } catch (error) {
        console.log("DB connection failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;