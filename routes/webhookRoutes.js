import express from "express";
import { webhookController } from "../controllers/webhookController.js";

export const webhookRoutes = express.Router();

webhookRoutes.post("/webhooks/payment",webhookController.webhookPayment);