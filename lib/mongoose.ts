import { MONGODB_CLUSTER_PUBLIC_URL } from "@/config";
import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);
    if (!MONGODB_CLUSTER_PUBLIC_URL) {
        return console.log("MONGO URL not found");
    }

    if (isConnected === true) {
        return console.log("Already connected to database");
    }
    await mongoose
        .connect(MONGODB_CLUSTER_PUBLIC_URL, {
            dbName: "Queue-Overflow",
        })
        .then(() => {
            isConnected = true;
        })
        .then(() => {
            console.log("Connected to Mongodb database");
        })
        .catch(() => {
            console.log("Error connecting to database");
        });
};
