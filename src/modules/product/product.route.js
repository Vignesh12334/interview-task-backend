import express from "express";
import ProductController from "./product.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes - require authentication
router.use(authMiddleware);

// Create new product
router.post("/", ProductController.createProduct);

// Get all products
router.get("/", ProductController.getAllProducts);

// Get product by ID
router.get("/:id", ProductController.getProductById);

export default router;
