import { Schema } from "mongoose";
import mongoose from "mongoose";
import { ORDER_CURRENCIES, ORDER_CURRENCIES_VALUES } from "../enums/OrderCurrencies.js";
import { ORDER_STATUS, ORDER_STATUS_VALUES } from "../enums/OrderStatus.js";

const orderSchema = new mongoose.Schema({
    orderId : {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    customerId: {
        type: Schema.Types.UUID,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 100 //100 Paise = 1 Rupee
    },
    currency: {
        type: String,
        enum: ORDER_CURRENCIES_VALUES,
        required: true,
    },
    status: {
        type: String,
        enum: ORDER_STATUS_VALUES,
        default: "pending"
    },
    paymentId: {
        type: String,
        default: null
    },
    paidAt: {
        type: Date
    }
},{timestamps: true});

export const Order = mongoose.model("Order",orderSchema);