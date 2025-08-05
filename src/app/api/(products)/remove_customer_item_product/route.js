import dbConnect from "@/lib/db";
import CustomerItemModel from "@/models/customerItemsSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";
import { verifyBearerToken } from "@/utils/ermauthmiddleware";

export async function DELETE(request) {
    try {
        verifyBearerToken(request);
        const {id} = await request.json();   
        if(!id){return handleError(null, "missing required fields")}        
        await dbConnect();
        const resp = await CustomerItemModel.updateMany(
            {},
            {$pull: {items: {_id: new mongoose.Types.ObjectId(id)}}}
        )
        if(resp.modifiedCount > 0){
            return handleSuccess(null, "product", "customer specific items deleted successfuly")
        }else{console.log("product item not found to delete");
            return handleSuccess(null, "products", "no matching items find to remove")
        }
        
    } catch (error) { return handleError(error) }
}