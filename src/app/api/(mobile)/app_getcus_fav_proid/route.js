import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import dbConnect from "@/lib/db";
import AppCustFavProModel from "@/models/appCusFavProSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET(request) {
    try {
        const customerId = await getMobileCustomerId(request);
        if (!customerId) { return handleError(null, "customer does not exist") };
        await dbConnect();
        const favDoc = await AppCustFavProModel.findOne({customerId});
        const favIds = favDoc ? favDoc.favProducts.map(p=>p.productId.toString()) : [];
        return handleSuccess(favIds, "favProIds", "favorites fetched")
    } catch (error) {
        return handleError(null, "network error");
    }
}