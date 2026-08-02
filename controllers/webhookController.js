import { ORDER_STATUS } from "../enums/OrderStatus.js";
import { WebhookService } from "../services/webhookService.js";

export async function webhookPayment(req,res){
    try {
        const {data} = req.body;

        const order = await WebhookService.findOrder(data.referenceId);

        if(!order){
            return res.status(404).json({
                message: "Order not found!"
            });
        }

        if(order.status === ORDER_STATUS.PAID || order.status === ORDER_STATUS.SHIPPED) {
            return res.status(200).json({
                message: "Payment already processed...."
            });
        }

        await WebhookService.processPaymentWebhook(order,data);

        console.log(
        `[Merchant] Order ${order.orderId} marked as PAID using payment ${data.paymentId}`
        );

         return res.status(200).json({
            message: "Webhook processed successfully."
        });

    }catch(error){
        console.error("Error with merchant webhook payment !",error);
        return res.status(500).json({
            message: "An internal server error occurred with webhook payment!"
        });
    }
}

export const webhookController = {
    webhookPayment
}