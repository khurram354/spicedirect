import dbConnect from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import SubSubCategoryModel from "@/models/subsubcategorySchema";

export async function POST (request) {
    try {
        const {subSubCategory, subCategoryId} = await request.json();
        await dbConnect();
        const resp = await SubSubCategoryModel.create({subCategoryId, name:subSubCategory});
        if(!resp){return handleError(null, "network error")};
        return handleSuccess(null, null, 'added successfully')
        
    } catch (error) {
        if(error.code === 11000) {
            return handleError(null, "subsubcategory already exist")
        };
        return handleError(error)
    }
}