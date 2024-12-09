import express from "express";
import UserController from "./user.controller.js";

const router = express.Router();

// Create a new user
router.post("/", UserController.createUser);

export default router;
