import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import InventoryCategory from "@/models/categorySchema";
import { NextResponse } from "next/server";
import { handleError } from "@/utils/errorHandler";

const searchFunction = async(query = {}, start_index, end_index) => {
    try {
        const resp = await InventoryProduct.find(query).populate('category').populate('subcategory').populate('subsubcategory').populate('vat').sort({ favourite: -1 });
                const productData = resp.slice(start_index, end_index);
                const hasMore = end_index < resp.length;
                const response = {
                    success: true,
                    data: productData,
                    hasMore: hasMore
                }
                return response;
    } catch (error) {return handleError(error)}
}
export async function POST(request) {
    try {
        const { pageno, checked, searchText, cuisineId, offersId, subcateId, subsubcateId } = await request.json();
        const page = pageno ? pageno : 1;
        const limit = 40;
        const start_index = (page - 1) * limit;
        const end_index = start_index + limit;
        await dbConnect();

        let query = {};
        if (checked?.length > 0) {  
            if (searchText) {
                query.category = { $in: checked };
                query.name = { $regex: searchText, $options: 'i' };
                const result = await searchFunction(query, start_index, end_index);
                return NextResponse.json(result);
            } else {
                query.category = { $in: checked }
                const result = await searchFunction(query, start_index, end_index);
                return NextResponse.json(result)
            }
        } else {
            if (searchText) {
                query = { name: { $regex: searchText, $options: 'i' } }
                const resp = await InventoryProduct.find(query).populate('category').populate('vat');
                const productData = resp.slice(start_index, end_index);
                const hasMore = end_index < resp.length;
                return NextResponse.json({
                    success: true,
                    data: productData,
                    hasMore: hasMore
                });
            } else if(cuisineId){
                query.cuisine = { $regex: new RegExp(cuisineId, 'i') };
                const result = await searchFunction(query, start_index, end_index);
                return NextResponse.json(result);
            } else if(offersId){
                query.special_categories = { $regex: new RegExp(offersId, 'i') };
                const result = await searchFunction(query, start_index, end_index);
                return NextResponse.json(result)
            } else if(subcateId){
                query.subcategory = subcateId;
                const result = await searchFunction(query, start_index, end_index);
                return NextResponse.json(result)
            } else if(subsubcateId){
                query.subsubcategory = subsubcateId;
                const result = await searchFunction(query, start_index, end_index);
                return NextResponse.json(result)
            } else {
                const result = await searchFunction(query, start_index, end_index);
                return NextResponse.json(result)
            }
       };
    } catch (error) {handleError(error)}
}
