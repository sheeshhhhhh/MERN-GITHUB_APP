import mongoose from "mongoose";

export const connecttodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to mongo DB")
    } catch (error) {
        console.log("error connecting to mongo db")
    }
}