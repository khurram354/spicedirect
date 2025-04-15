import dbConnect from "@/lib/db";
import CuisineModel from "@/models/cuisineSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET() {
    try {
        await dbConnect();
        let cuisines = await CuisineModel.find({});
        if(!cuisines || cuisines.length === 0){return handleError(null, 'cuisines not found')}
        return handleSuccess(cuisines, "cuisines", "Get all cuisines data successfully");
    } catch (error) {
        return handleError(error)
    }
}

