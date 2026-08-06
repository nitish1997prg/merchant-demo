import {Order} from "../models/Order.js";
import {withSpan} from "../telemetry/withSpan.js";

export async function findOrder(id){
    return await Order.findOne({orderId: id});
}

export async function processPaymentWebhook(order,data){
    return withSpan("Process Payment Webhook",async (span)=>{
        span.setAttribute("payment.paymentId",data.paymentId);
        try {
        order.status = "paid";
        order.paidAt = new Date();
        order.paymentId = data.paymentId;

        await withSpan("Save Order",async ()=>{
             await order.save();
        });

    }catch(error){
        console.error("Error processing payment webhook!",error);
        throw error;
    }
    })
   
}

export const WebhookService = {
    findOrder,
    processPaymentWebhook
}