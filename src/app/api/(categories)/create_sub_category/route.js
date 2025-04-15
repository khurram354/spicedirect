import dbConnect from "@/lib/db";
import SubCategoryModel from "@/models/subcategorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const { categoryId,subCategory } = await request.json();
        await dbConnect();
        const resp = await SubCategoryModel.create({categoryId, name:subCategory});
        if(!resp){ return handleError(null, "network error")}
        return handleSuccess(null, null, 'added successfully')
    } catch (error) {
        if(error.code === 11000){
           return handleError(null, 'subCategory already exist')
        }
        return handleError(error)
    }
}