import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const { proId, Fav } = await request.json();
        await dbConnect();
        let product = await InventoryProduct.findById(proId);
        if(!product){return handleError(null, "product not found");}
        product.favourite = Fav;
        const resp = await product.save();
        if(!resp){return handleError(null, "Error add to Most Selling")}
        return handleSuccess(null, null, "Product Add to Most Selling")
    } catch (error) {return handleError(error)}
}