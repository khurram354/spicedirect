import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";
import { verifyBearerToken } from "@/utils/ermauthmiddleware";

export async function POST(request) {
    try {
        verifyBearerToken(request);
        let productData = await request.json(request.body);
        let { _id } = productData;
        if (!mongoose.Types.ObjectId.isValid(_id)) { return handleError(null, "invalid product Id") }
        await dbConnect();
        const proudctExist = await InventoryProduct.findById(_id);       
        ['supplier1', 'supplier2', 'supplier3','item_image'].forEach(key => delete productData[key]);
        if (proudctExist) {
            await InventoryProduct.findByIdAndUpdate(_id, productData, { new: true })
        } else {
            const id = new mongoose.Types.ObjectId(_id);
            productData._id = id;
            await InventoryProduct.create(productData);
        }
        return handleSuccess(null, "product", "Product Added/updated successfully")
    } catch (error) { return handleError(error) }
}