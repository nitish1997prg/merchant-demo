import express from "express";
import { orderRoutes } from "./routes/orderRoutes.js";

export const app = express();

app.use(express.json());
app.use(orderRoutes);