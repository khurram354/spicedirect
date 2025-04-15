import dbConnect from "@/lib/db";
import InventoryCategory from "@/models/categorySchema";
import SubCategoryModel from "@/models/subcategorySchema";
import SubSubCategoryModel from "@/models/subsubcategorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET() {
    try {
        await dbConnect();
        const allMenuCategories = await InventoryCategory.aggregate([
            {
                $lookup:{
                    from:"subcategories",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "subcategories"
                }
            },{
                $unwind:{
                    path: "$subcategories",
                    preserveNullAndEmptyArrays: true
                }
            },{
                $lookup:{
                    from:"subsubcategories",
                    localField:"subcategories._id",
                    foreignField:"subCategoryId",
                    as: "subcategories.subsubcategories"
                }
            },{
                $group: {
                    _id: '$_id',
                    name: {$first: "$name"},
                    subcategories: {$push: "$subcategories"}
                }
            }
        ])  
        return handleSuccess(allMenuCategories, 'categories', "Get all categories successfully");
    } catch (error) {
        console.log("error fetching data:", error);
        return handleError(error)
    }
}