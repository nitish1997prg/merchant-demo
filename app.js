import express from "express";
import { orderRoutes } from "./routes/orderRoutes.js";
import { webhookRoutes } from "./routes/webhookRoutes.js";
import { traceIdMiddleware } from "./middleware/traceId.js";

export const app = express();

app.use(express.json());
app.use(traceIdMiddleware);
app.use(orderRoutes);
app.use(webhookRoutes);