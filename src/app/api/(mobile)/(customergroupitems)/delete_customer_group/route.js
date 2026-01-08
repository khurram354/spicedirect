import dbConnect from "@/lib/db";
import CustomerGroupItemModel from "@/models/customerGroupSchema";
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
        const resp = await CustomerGroupItemModel.deleteOne(
            {_id: new mongoose.Types.ObjectId(id)}
        )
        if(resp.deletedCount > 0){
            return handleSuccess(null, "group", "customer group deleted successfuly")
        }else{console.log("no matching found to delete");
            return handleSuccess(null, "group", "no matching group find to remove")
        }
        
    } catch (error) { return handleError(error) }
}