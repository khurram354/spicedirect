import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import dbConnect from "@/lib/db";
import OrdersModel from "@/models/ordersSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try { 
        const { orderPayload } = await request.json();
        if(!orderPayload){return handleError(null, 'missing req order data')};
        const customerId = await getMobileCustomerId(request);
        if(!customerId){return handleError(null, "customer not found")}
        await dbConnect();
        const resp = await OrdersModel.create(orderPayload);
        if(!resp){return handleError(null, "network error")}
        return handleSuccess(null, null, "order created successfully")
    } catch (error) {return handleError(error)}
}