import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import dbConnect from "@/lib/db";
import CustomerModel from "@/models/customerSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET(request) {
    try {
        const customerId = await getMobileCustomerId(request);
        if (!customerId) { return handleError(null, 'customer does not exist')};
        await dbConnect();
        const customer = await CustomerModel.findById(customerId);
        if (!customer) { return handleError(null, "Invalid customer") };
        const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        const deliveryDayIndex = customer.zones.map((z,index)=>z != null ? index : null).filter(d => d != null);
        const deliveryDay = deliveryDayIndex.map((i) => weekDays[i]);
        return handleSuccess({customer, deliveryDay}, "user", "fetched profile data");
    } catch (error) {
        return handleError(null, "network error");
    }
}