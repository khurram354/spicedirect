import dbConnect from "@/lib/db";
import BlogModel from "@/models/blogSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET(request,{params}) {
    try {
        const {id} = await params;
        await dbConnect();
        let resp = await BlogModel.findById(id);
        if(!resp){handleError(null, "Error getting data")}
        return handleSuccess(resp, "blog", "Get Blog Successfully")
    } catch (error) {
        return handleError(error)
    }
}

