import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { NextResponse } from "next/server";
import { handleError } from "@/utils/errorHandler";
import CustomerItemModel from "@/models/customerItemsSchema";
import CustomerModel from "@/models/customerSchema";
import { verifyAIBearerToken } from "@/utils/aiauthmiddleware";

export async function GET(request) {
    try {
        verifyAIBearerToken(request);
        await dbConnect();
        // const { searchParams } = new URL(request.url);
        // const phone = searchParams.get("phone");
        // const email = searchParams.get("email");
        // if (!phone && !email) { return NextResponse.json({ success: false, message: 'phone or email required' }, { status: 400 }) }
        const products = await InventoryProduct.find({ active: true }).select("_id name").lean();
        // const data = await setCustomerSpecificPrices(phone, email, products);
        return NextResponse.json({
            success: true,
            count: products.length,
            data:products,
        });

    } catch (error) { 
        if (error.message === 'Unauthorized: Invalid token') {
            return NextResponse.json(
                { success: false, message: 'Invalid or missing token' },
                { status: 401 }
            );
        }
        handleError(error) }
}
