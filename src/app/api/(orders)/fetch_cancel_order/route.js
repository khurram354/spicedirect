import dbConnect from "@/lib/db";
import OrdersModel from "@/models/ordersSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";
import { verifyBearerToken } from "@/utils/ermauthmiddleware";

export async function GET(request) {
    try {
        verifyBearerToken(request)
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        await dbConnect();
        let query = {order_status: "cancelled"};


        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) { return handleError(null, "invalid id") }
            query = {
                $and: [
                    { _id: { $gt: new mongoose.Types.ObjectId(id) } },
                    { order_status: "cancelled" }
                ]
            };
        } 
        const cancelledOrder = await OrdersModel.find(query).sort({ _id: 1 });
        return handleSuccess(cancelledOrder, "cancelledOrder", "orders fetched successfully")
    } catch (error) { return handleError(error) }
}