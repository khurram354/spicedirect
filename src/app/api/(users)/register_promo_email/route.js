import dbConnect from "@/lib/db";
import PromotionModel from "@/models/promotionemailSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const { email } = await request.json();
        await dbConnect();
        const resp = await PromotionModel.create({email})
        if(!resp){return handleError(null, "Error created new user")};
        return handleSuccess(null, null, "Register successfully")
    } catch (error) {
        if(error.code === 11000){return handleError(null, 'email already exist')};
        return handleError(error, error.message)}
}