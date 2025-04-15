import dbConnect from "@/lib/db";
import HomeSliderModel from "@/models/homesliderSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await dbConnect();
        const result = await HomeSliderModel.findByIdAndDelete(id);
        if(!result){handleError(null, 'network error, try again please')}
      
        return handleSuccess(null, null, 'delete slider successfully')
    } catch (error) {return handleError(error);}
}

