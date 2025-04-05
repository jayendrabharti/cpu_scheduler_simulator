import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDb is already connected");
        return;
    }

    try {
        const uri = process.env.MONGODB_URI || "";
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        await mongoose.connect(
            uri,
            {
                dbName: "cpu_scheduler_simulator",
            }
        );

        isConnected = true;
        console.log("MongoDB connected");
    } catch (e) {
        console.error("Failed to connect to MongoDB:", e.message);
    }
};