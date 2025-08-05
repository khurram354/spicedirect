import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";
import { verifyBearerToken } from "@/utils/ermauthmiddleware";

export async function DELETE(request) {
    try {
        verifyBearerToken(request);
        const { id } = await request.json();
        if (!id) { return handleError(null, "missing required fields") }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return handleError(null, "Invalid product ID");
        }
        await dbConnect();
        const resp = await InventoryProduct.findByIdAndDelete(id);
        if (resp) {
            return handleSuccess(null, "product", "product deleted successfully")
        } else {
            return handleSuccess(null, "products", "no matching product found to delete")
        }

    } catch (error) { return handleError(error) }
}