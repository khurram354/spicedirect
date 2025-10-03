import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { NextResponse } from "next/server";
import { handleError } from "@/utils/errorHandler";
import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import CustomerItemModel from "@/models/customerItemsSchema";
import AppCustFavProModel from "@/models/appCusFavProSchema";

const setCustomerSpecificPrices = async(customerId, resultData) => {
    const customerSpecificProducts = await CustomerItemModel.find({customer:customerId});
        const customerItemsMap = {};
        if(customerSpecificProducts.length > 0){
            for(const item of customerSpecificProducts[0].items){
                customerItemsMap[item._id.toString()] = item.rate
            }
        };
        const updateProductPriceData = resultData.map((product) => {
            const customRate = customerItemsMap[product._id.toString()];
            if(customRate !== undefined){
                return {
                    ...product,
                    default_sale_price: customRate
                }
            }
            return product
        });
        return updateProductPriceData;
}

export async function POST(request) {
    try {
        const {pageno} = await request.json();
        const page = pageno ? pageno : 1;
        const limit = 40;
        const start_index = (page-1)*limit;
        const end_index = start_index + limit;
        await dbConnect();
        const customerId = await getMobileCustomerId(request);
        if(!customerId){return handleError(null, "customer does not exist")};
        const customerFavPro = await AppCustFavProModel.findOne({customerId});
        if(!customerFavPro || customerFavPro.favProducts.length === 0){return handleError(null, 'no customer fav products')}
        const customerFavProIds = customerFavPro?customerFavPro.favProducts.map(p=>p.productId) : [];
        const favProducts = await InventoryProduct.find({_id: {$in:customerFavProIds},active:true}).populate("category").populate("subcategory").populate("vat").populate("subsubcategory").lean();
        const resp = await setCustomerSpecificPrices(customerId, favProducts);
        const totalPages = Math.ceil(resp.length/40);
        const productData = resp.slice(start_index, end_index);
        const hasMore = end_index < resp.length;
        return NextResponse.json({
            success:true, 
            data: productData,
            hasMore: hasMore,
            totalPages: totalPages,
        }) 
    } catch (error) {handleError(error)}
}
