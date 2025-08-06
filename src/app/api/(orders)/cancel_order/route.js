import dbConnect from "@/lib/db";
import OrdersModel from "@/models/ordersSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";
import { getMobileCustomerId } from "@/helper/getMobileCustomerId";

export async function PUT(request) {
    try {
        const customerId = await getMobileCustomerId(request);
        if (!customerId) { return handleError(null, "customer does not exist") }
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return handleError(null, "Missing required 'id' field");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return handleError(null, "Invalid order ID");
        }
        await dbConnect();
        const updatedOrder = await OrdersModel.findByIdAndUpdate(
            id,
            { order_status: "cancelled" },
            { new: true }
        );

        if (!updatedOrder) {
            return handleError(null, "Order not found");
        }

        return handleSuccess(updatedOrder, "cancelledOrder", "Order cancelled successfully");
    } catch (error) {
        return handleError(error);
    }
}
