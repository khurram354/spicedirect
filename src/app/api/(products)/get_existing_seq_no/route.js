import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { procateid } = await request.json();
        if(!procateid){return handleError(null, 'missing req field')}
        await dbConnect();
        let products = await InventoryProduct.find({category:procateid._id, cate_sequence_no: {$ne:null}},{cate_sequence_no:1, _id:0});
        const values = products.map(p => p.cate_sequence_no).sort((a,b)=>b-a);
        if(values.length === 0){return NextResponse.json({success:true, value:1})}
        const nextValue = values[0]+1;
        return NextResponse.json({success:true, value:nextValue})
    } catch (error) {return handleError(error)}
}