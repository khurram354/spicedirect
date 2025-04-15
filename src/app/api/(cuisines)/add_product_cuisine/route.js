import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const { proId, allCheck } = await request.json();
        await dbConnect();
        let product = await InventoryProduct.findById(proId);
        if(!product){return handleError(null, "Product Does Not Exist")}
        product.cuisine = allCheck;
        await product.save();
        return handleSuccess(null, null, "added cuisine successfully")
    } catch (error) {handleError(error)}
}