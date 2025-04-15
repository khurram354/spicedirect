import dbConnect from "@/lib/db";
import BlogModel from "@/models/blogSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET() {
    try {
        await dbConnect();
        let resp = await BlogModel.find({},'homeBlogTitle homeBlogDesc mainTitleImage');
        if(!resp || resp.length === 0){return handleError(null, 'Error fetching data from database')}
        return handleSuccess(resp, 'blogs', 'fetch all Blogs Successfully');    
    } catch (error) {
        return handleError(error)
    }
}

