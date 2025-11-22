import dbConnect from "@/lib/db";
import subcategories from "@/models/subcategorySchema"
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET() {
    try {
        await dbConnect();
        const allSubCategories = await subcategories.find();
        if(!subcategories || subcategories.length === 0){return handleError(null, "Error getting categories")};
        return handleSuccess(allSubCategories, 'categories', "Get all categories successfully");
    } catch (error) {
        console.log("error fetching data:", error);
        return handleError(error)
    }
}