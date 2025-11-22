import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function PUT(request) {
    try {
        const { id, procateid, productIndex } = await request.json();
        if(!id || !procateid || !productIndex){return handleError(null, 'missing req field')}
        await dbConnect();
        let product = await InventoryProduct.findById(id);
        if(!product){return handleError(null, "product not found");}
        product.cate_sequence_no = productIndex;
        const resp = await product.save();
        if(!resp){return handleError(null, "Error add to Most Selling")}
        return handleSuccess(null, null, "Product Add to Most Selling")
    } catch (error) {return handleError(error)}
}