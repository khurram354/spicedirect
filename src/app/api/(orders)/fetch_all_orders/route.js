import dbConnect from "@/lib/db";
import OrdersModel from "@/models/ordersSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";

export async function GET(request) {
    try { 
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        await dbConnect();
        let orders;
        if(id){
            if(!mongoose.Types.ObjectId.isValid(id)){return handleError(null, "invalid id")}
            orders = await OrdersModel.find({_id: {$gt: new mongoose.Types.ObjectId(id)}}).sort({_id: 1});
        }else{
            orders = await OrdersModel.find({}).sort({_id: 1});
        }
        
       
        // if(!resp){return handleError(null, "network error")}
        return handleSuccess(orders, "orders", "order created successfully")
    } catch (error) {return handleError(error)}
}