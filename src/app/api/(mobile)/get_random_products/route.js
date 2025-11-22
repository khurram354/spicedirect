import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { NextResponse } from "next/server";
import { handleError } from "@/utils/errorHandler";
import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import CustomerItemModel from "@/models/customerItemsSchema";


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

export async function GET(request) {
    try {
        await dbConnect();
        const customerId = await getMobileCustomerId(request);
        if(!customerId){return handleError(null, "customer does not exist")}
        const randomProducts = await InventoryProduct.aggregate([
            {$match:{active:true}},{$sample:{size:15}}
        ]);
        const populatedProducts = await InventoryProduct.populate(randomProducts,[{path:"category"},{path:"subcategory"},{path:"vat"},{path:"subsubcategory"}]);
        const productsWithPrice = await setCustomerSpecificPrices(customerId, populatedProducts);
        return NextResponse.json({
            success:true, data: productsWithPrice
        }) 
    } catch (error) {handleError(error)}
}
