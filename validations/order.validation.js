import * as z from "zod";
import { ORDER_CURRENCIES } from "../enums/OrderCurrencies.js";

export const createOrderSchema = z.object({
    orderId : z.string({error: "OrderId must be a valid String!"}).trim().min(1,{error: "OrderId must have a length of atleast 1!"}),
    customerId: z.uuidv4({error: "CustomerId must be a valid UUID (Version 4)"}),
    amount: z.number({error: "Amount must be valid number!"}).nonnegative({error: "Amount cannot be negative"}).min(1,{error: "Amount must be atleast 1!"}),
    currency: z.enum(ORDER_CURRENCIES,{error: "Currency must be a valid value!"})
});

export const getOrdersQuerySchema = z.object({
    offset: z.coerce.number().int().nonnegative().default(0),
    limit: z.coerce.number().int().nonnegative().default(10)
});

export const Validator = {
    createOrderSchema,
    getOrdersQuerySchema
}