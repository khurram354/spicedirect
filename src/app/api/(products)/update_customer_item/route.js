import dbConnect from "@/lib/db";
import CustomerItemModel from "@/models/customerItemsSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";
import { verifyBearerToken } from "@/utils/ermauthmiddleware";

export async function POST(request) {
    try {
        verifyBearerToken(request)
        const {id, price} = await request.json();   
        if(!id || !price){return handleError(null, "missing required fields")}        
        await dbConnect();
        const resp = await CustomerItemModel.updateMany(
            {"items._id": new mongoose.Types.ObjectId(id),},
            {$set: {"items.$[elem].rate": price}},
            {arrayFilters: [{"elem._id": new mongoose.Types.ObjectId(id)}]}
        )
        if(resp.modifiedCount > 0){
            return handleSuccess(null, "product", "customer specific prices updated successfully")
        }else{console.log("product not found to update");
            return handleSuccess(null, "products", "no prices to updates")
        }
        
    } catch (error) { return handleError(error) }
}