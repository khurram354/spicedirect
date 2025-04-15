import dbConnect from "@/lib/db";
import InventoryCategory from "@/models/categorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET() {
    try {
        await dbConnect();
        const allCategories = await InventoryCategory.find();
        if(!allCategories || allCategories.length === 0){return handleError(null, "Error getting categories")};
        return handleSuccess(allCategories, 'categories', "Get all categories successfully");
    } catch (error) {
        console.log("error fetching data:", error);
        return handleError(error)
    }
}