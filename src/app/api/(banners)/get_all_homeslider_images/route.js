import dbConnect from "@/lib/db";
import HomeSliderModel from "@/models/homesliderSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET() {
    try {
        await dbConnect();
        const sliders = await HomeSliderModel.find({});
        if (!sliders || sliders.length === 0) {
            return handleError(null, "slider images not found");
        }
        return handleSuccess(sliders, 'sliders', 'get slider successfully')
    } catch (error) {return handleError(error);}
}

