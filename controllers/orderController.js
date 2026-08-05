import { Validator } from "../validations/order.validation.js";
import { OrderService } from "../services/orderService.js";
import { logger } from "../utils/logger.js";

export async function createOrder(req,res){
    try {
        
        const body = req.body;
        
        if(!body){
            return res.status(400).json({
                message: "Request Body is missing!"
            });
        }

        const order = Validator.createOrderSchema.parse(body);

        const createdOrder = await OrderService.insertOrder(order);

        logger.info({
            orderId: createdOrder.orderId
        },"Order Created");

        return res.status(201).json({
            message: "Order created successfully!",
            orderId: createdOrder._id
        });

    }catch(error){
        console.error("Error creating order!",error);
        return res.status(500).json({
            message: "An internal server error occurred while creating order!"
        });
    }
}

export async function getAllOrders(req,res){
    try {
        const query = req.query;

        if(!query){
            return res.status(400).json({
                message: "Request Query params not found!"
            });
        }

        const orderQuery = Validator.getOrdersQuerySchema.parse(query);

        const orders = await OrderService.getOrders({offset: orderQuery.offset, limit: orderQuery.limit});

        return res.status(200).json(orders);

    }catch(error){
        console.error("Error fetching all orders!",error);
        return res.status(500).json({
            message: "An internal server error occurred while fetching orders!"
        });
    }
}

export const orderController = {
    createOrder,
    getAllOrders
};