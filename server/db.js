// server/db.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env laden

// 🔌 Verbindung zur MongoDB-Datenbank
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB verbunden");
    } catch (error) {
        console.error("❌ Fehler beim Verbinden mit MongoDB:", error.message);
        process.exit(1); // Bricht den Serverstart bei Verbindungsfehler ab
    }
};

export default connectDB;
