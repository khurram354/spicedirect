import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const { proId, allCheck } = await request.json();
        await dbConnect();
        let product = await InventoryProduct.findById(proId);
        if(!product){ return handleError(null, "Product Does Not Exist")}
        product.special_categories = allCheck;
        const resp = await product.save();
        if(!resp){return handleError(null, "cannot add special category")}
        return handleSuccess(null, null, 'added special category successfully')
    } catch (error) {
        return handleError(error)
    }
}