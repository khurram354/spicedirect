import dbConnect from "@/lib/db";
import BannersModel from "@/models/bannersSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET() {
    try {
        await dbConnect();
        let banners = await BannersModel.find({});
        if (!banners || banners.length === 0) {
            return handleError(null, "banners not found");
        }
        return handleSuccess(banners, 'banners', 'get Banner successfully')
    } catch (error) {return handleError(error);}
}

