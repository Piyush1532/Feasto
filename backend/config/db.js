import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/FeastoApp`);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Failed:", error.message);
    }
};
