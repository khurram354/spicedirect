import dbConnect from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import SubSubCategoryModel from "@/models/subsubcategorySchema";
import InventoryProduct from "@/models/inventorySchema";

export async function POST (request) {
    try {
        const {proId} = await request.json();
        await dbConnect();
        let productSubCategory = '';
        if(proId) {
            const product = await InventoryProduct.findById(proId);
            if(!product) { return handleError(null, "Product does not exist")};
            productSubCategory = product.subcategory;
        }
        let resp = await SubSubCategoryModel.find().populate('subCategoryId');
        if(productSubCategory){
            resp = resp.filter(item => item.subCategoryId._id.equals(productSubCategory))
        }
        if(!resp || resp.length === 0){return handleError(null, "no subcategories found")}
        return handleSuccess(resp, 'subsubcategories','successfully get data')
    } catch (error) {handleError(error)}
}