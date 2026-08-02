import { Order } from "../models/Order.js";

export async function insertOrder(order){
    return await Order.create(order);
}

export async function getOrders({offset=0,limit=10}){
    return await Order.find({}).skip(offset).limit(limit);
}

export const OrderService = {
    insertOrder,
    getOrders
}