import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectdb } from "./config/db.js";
import productRoutes from  './routes/product.route.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectdb();
    console.log(`Server is started at http://localhost:${PORT}`);
});

