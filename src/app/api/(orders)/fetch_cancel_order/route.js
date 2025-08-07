import dbConnect from "@/lib/db";
import OrdersModel from "@/models/ordersSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";
import { verifyBearerToken } from "@/utils/ermauthmiddleware";

export async function GET(request) {
    try {
        // verifyBearerToken(request)
        const { searchParams } = new URL(request.url);
        const fromDate = searchParams.get("from");
        const toDate = searchParams.get("to");
        if(!fromDate ||!toDate){return handleError(null, "missing requird fields")};
        await dbConnect();
        let query = {
            order_status: "cancelled",
            ot_date: {$gte: new Date(fromDate), $lte: new Date(toDate)},
        };
        
        const cancelledOrder = await OrdersModel.find(query).sort({ _id: 1 });
        return handleSuccess(cancelledOrder, "cancelledOrder", "orders fetched successfully")
    } catch (error) { return handleError(error) }
}