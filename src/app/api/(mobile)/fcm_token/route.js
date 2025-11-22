import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import dbConnect from "@/lib/db";
import CustomerModel from "@/models/customerSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const { fcmtoken } = await request.json();
        const customerId = await getMobileCustomerId(request);
        if (!customerId) { return handleError(null, "customer does not exist") }
        const user = await CustomerModel.findByIdAndUpdate(customerId,{fcmtoken}); 
        return handleSuccess(null, "token", "fcmtoken added/updatd successfully");
    } catch (error) {
        return handleError(null, "network error");
    }
}