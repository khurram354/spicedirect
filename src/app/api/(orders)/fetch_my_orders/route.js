import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import dbConnect from "@/lib/db";
import OrdersModel from "@/models/ordersSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";

export async function GET(request) {
    try {
        const customerId = await getMobileCustomerId(request);
        if (!customerId) { return handleError(null, "customer does not exist") }
        await dbConnect();
        if (!mongoose.Types.ObjectId.isValid(customerId)) { return handleError(null, "invalid customer") }
        let orders = await OrdersModel.find({ customer: customerId }, { invoice_date: 1, ot_date: 1, order_number: 1, total_incl_vat: 1, order_status: 1, items: 1 });
        orders = orders.map(order => {
            const obj = order.toObject();
            return {
                ...obj,
                itemsLength: obj.items.length,
                items: undefined,
            }
        });
        return handleSuccess(orders, "orders", "orders fetched successfully")
    } catch (error) { return handleError(error) }
}