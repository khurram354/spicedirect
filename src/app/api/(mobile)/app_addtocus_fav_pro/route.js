import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import dbConnect from "@/lib/db";
import AppCustFavProModel from "@/models/appCusFavProSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function PUT(request) {
    try { 
        const customerId = await getMobileCustomerId(request);
        if(!customerId){return handleError(null, "customer not found")};
        const {searchParams} = new URL(request.url);
        const productId = searchParams.get("id");
        if (!productId) { return handleError(null, "product does not exist") };
        await dbConnect();
        let favDoc = await AppCustFavProModel.findOne({customerId});
        if(favDoc){
            const alreadyFav = favDoc.favProducts.some((p)=>p.productId.toString() === productId);
            if(alreadyFav){
                favDoc = await AppCustFavProModel.findOneAndUpdate({customerId}, {$pull:{favProducts:{productId}}}, {new:true});
                return handleSuccess(favDoc, null, "product removed from favorites");
            }else{
                favDoc = await AppCustFavProModel.findOneAndUpdate({customerId}, {$addToSet: {favProducts:{productId}}}, {new: true});
                return handleSuccess(favDoc, null, 'product added to favorites')
            }
        }else{
            const newDoc = await AppCustFavProModel.create({customerId, favProducts: [{productId}]});
            return handleSuccess(newDoc, "productData", "product added to favorites")
        }
    } catch (error) {return handleError(error)}
}