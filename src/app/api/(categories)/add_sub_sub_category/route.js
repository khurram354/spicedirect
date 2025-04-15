import dbConnect from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import InventoryProduct from "@/models/inventorySchema";

export async function POST(request){
    try {
        const {subsubcategory,proId} = await request.json();
        await dbConnect();
        const product = await InventoryProduct.findById(proId);
        if(!product){return handleError(null, "product not found")}
        product.subsubcategory = subsubcategory;
        const resp = await product.save();
        if(!resp){return handleError(null, 'cannot add category')}
        return handleSuccess(null, null, 'subcategory added successfully');
    } catch (error) {
        return handleError(error)
    }
}