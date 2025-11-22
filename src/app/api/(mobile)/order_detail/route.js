import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import dbConnect from "@/lib/db";
import OrdersModel from "@/models/ordersSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("orderid");
        if(!id){return handleError(null, "order does not exist")};
                const customerId = await getMobileCustomerId(request);
                if (!customerId) { return handleError(null, "customer does not exist") }
                await dbConnect();
                if (!mongoose.Types.ObjectId.isValid(id)) { return handleError(null, "invalid order") }
                let orderDetail = await OrdersModel.findById(id, {invoice_date:1, ot_date:1, order_number:1, 
        total_incl_vat:1, items:1,vat_total: 1, total_no_vat:1});
        return handleSuccess(orderDetail, "orderDetail", "order details fetched successfully")
    } catch (error) { return handleError(error) }
}