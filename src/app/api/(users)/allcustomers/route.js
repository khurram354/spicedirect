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
        const limit = 20;
        const start_index = (page - 1) * limit;
        const end_index = start_index + limit;
        await dbConnect();
        let query = {active: true};

        if(searchText){
            query={
                ...query,
                $or:[
                    {customer_name: {$regex:searchText, $options:'i'}},
                    {email: {$regex: searchText, $options:'i'}},
                    {mobile: {$regex: searchText, $options: 'i'}}
                ]
            };
        }
        const statsPipeline = [
            {$facet: {
                totalCustomers:[{$count: 'count'}],
                activeCustomers:[{$match: {active:true}},{$count:'count'}],
                inactiveCustomers:[{$match: {active:false}},{$count:"count"}]
            }}
        ]
        const statsResult = await CustomerModel.aggregate(statsPipeline);
        const [customersData, totalCount] = await Promise.all([
            CustomerModel.find(query).skip(start_index).limit(limit),
            CustomerModel.countDocuments(query)
        ])
        const totalPages = Math.ceil(totalCount/limit);
        const hasMore = (page*limit) < totalCount;
        const customers = {
            success: true,
            data: customersData,
            hasMore: hasMore,
            totalPages: totalPages,
            stats: {
                total: statsResult[0]?.totalCustomers[0]?.count || 0,
                active: statsResult[0]?.activeCustomers[0]?.count || 0,
                inactive: statsResult[0]?.inactiveCustomers[0]?.count || 0
            }
        }
        return NextResponse.json(customers)
    } catch (error) { return handleError(error); }
}

