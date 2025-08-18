import dbConnect from "@/lib/db";
import CustomerModel from "@/models/customerSchema";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";
import TokenHandler from "@/utils/tokenHandler";

export async function POST(request) {
    try {
        const token = await TokenHandler();
        if(token !== "admin_account"){return handleError(null, "Please login first to get details")}
        const { pageno, searchText } = await request.json();
        const page = pageno ? pageno : 1;
        const limit = 40;
        const start_index = (page - 1) * limit;
        const end_index = start_index + limit;
        await dbConnect();
        let query = {};

        query = { customer_name: { $regex: searchText, $options: 'i' }, active:true }
        const resp = await CustomerModel.find(query);
        const totalPages = Math.ceil(resp.length/40);
        const customersData = resp.slice(start_index, end_index);
        const hasMore = end_index < resp.length;
        const customers = {
            success: true,
            data: customersData,
            hasMore: hasMore,
            totalPages: totalPages
        }
        return NextResponse.json(customers)
    } catch (error) { return handleError(error); }
}

