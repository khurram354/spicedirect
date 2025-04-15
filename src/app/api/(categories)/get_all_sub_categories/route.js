import dbConnect from "@/lib/db";
import SubCategoryModel from "@/models/subcategorySchema";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const {proId} = await request.json();
        await dbConnect();
        let productCategory = '';
        if(proId) {
            const product = await InventoryProduct.findById(proId);
            if(!product) {return handleError(null, "product does not exist")}
            productCategory = product.category;
        };
        let resp = await SubCategoryModel.find().populate("categoryId");
        if(!resp || resp.length === 0){ return handleError(null, "no subCategories found")}
        if(productCategory) {
            resp = resp.filter(item => item.categoryId._id.equals(productCategory));
        }
        return handleSuccess(resp, 'subcategories', 'successfully')
    } catch (error) {
        if(error.code === 11000){
           return handleError(null, 'Please enter a unique sub category')
        }
        return handleError(error)
    }
}