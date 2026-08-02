import express from "express";
import { orderController } from "../controllers/orderController.js";

export const orderRoutes = express.Router();

orderRoutes.post("/orders",orderController.createOrder);
orderRoutes.get("/orders",orderController.getAllOrders);