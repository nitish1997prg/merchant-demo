import {Order} from "../models/Order.js";

export async function findOrder(id){
    return await Order.findOne({orderId: id});
}

export async function processPaymentWebhook(order,data){
    try {
        order.status = "paid";
        order.paidAt = new Date();
        order.paymentId = data.paymentId;

        await order.save();

    }catch(error){
        console.error("Error processing payment webhook!",error);
        throw error;
    }
}

export const WebhookService = {
    findOrder,
    processPaymentWebhook
}