import express from "express";
import cors from "cors";
import userRoutes from "./modules/user/user.route.js";
import productRoutes from "./modules/product/product.route.js";
import authRoutes from "./modules/auth/auth.route.js";

export const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
