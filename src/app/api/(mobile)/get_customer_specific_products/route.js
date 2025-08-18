import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import InventoryCategory from "@/models/categorySchema";
import { NextResponse } from "next/server";
import { handleError } from "@/utils/errorHandler";
import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import CustomerItemModel from "@/models/customerItemsSchema";


const setCustomerSpecificPrices = async (customerId, resultData) => {
    const customerSpecificProducts = await CustomerItemModel.find({ customer: customerId });
    const customerItemsMap = {};
    if (customerSpecificProducts.length > 0) {
        for (const item of customerSpecificProducts[0].items) {
            customerItemsMap[item._id.toString()] = item.rate
        }
    };
    const updateProductPriceData = resultData.map((product) => {
        const customRate = customerItemsMap[product._id.toString()];
        if (customRate !== undefined) {
            return {
                ...product.toObject(),
                default_sale_price: customRate
            }
        }
        return null;
    }).filter((product) => product !== null);
    return updateProductPriceData;
}

export async function POST(request) {
    try {
        const { pageno } = await request.json();
        const page = pageno ? pageno : 1;
        const limit = 40;
        const start_index = (page - 1) * limit;
        const end_index = start_index + limit;
        const customerId = await getMobileCustomerId(request);
        await dbConnect();
        const resultData = await InventoryProduct.find().populate('category').populate('vat');
        const resp = await setCustomerSpecificPrices(customerId, resultData);
        const totalPages = Math.ceil(resp.length / 40);
        const productData = resp.slice(start_index, end_index);
        const hasMore = end_index < resp.length;
        return NextResponse.json({
            success: true,
            data: productData,
            hasMore: hasMore,
            totalPages: totalPages,
        });

    } catch (error) { handleError(error) }
}
