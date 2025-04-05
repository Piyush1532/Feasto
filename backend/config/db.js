import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/Feasto-app`);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Failed:", error.message);
    }
};
