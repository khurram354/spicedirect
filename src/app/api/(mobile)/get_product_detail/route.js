import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import CustomerItemModel from "@/models/customerItemsSchema";

const setCustomerSpecificPrices = async(customerId, product) => {
    const customerSpecificProducts = await CustomerItemModel.find({customer:customerId});
        const customerItemsMap = {};
        if(customerSpecificProducts.length > 0){
            for(const item of customerSpecificProducts[0].items){
                customerItemsMap[item._id.toString()] = item.rate
            }
        };
            const customRate = customerItemsMap[product._id.toString()];
            const plainProduct = product.toObject(); 
            if(customRate !== undefined){
                return {
                    ...plainProduct,
                    default_sale_price: customRate
                }
            }
            return plainProduct;
}
export async function GET(request) {
    try {
        const customerId = await getMobileCustomerId(request);
        if (!customerId) { return handleError(null, "customer does not exist") }
        await dbConnect();
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) { return handleError(null, "product does not exist") };
        const resp = await InventoryProduct.findById(id).populate('vat');
        const product = await setCustomerSpecificPrices(customerId, resp);
        return handleSuccess(product, 'product_detail', "Get product detail successfully");
    } catch (error) {
        console.log("error fetching data:", error);
        return handleError(error)
    }
}