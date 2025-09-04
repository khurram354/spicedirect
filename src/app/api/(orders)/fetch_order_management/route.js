import dbConnect from "@/lib/db";
import OrdersModel from "@/models/ordersSchema";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";
import TokenHandler from "@/utils/tokenHandler";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    const token = await TokenHandler();
    if (token !== "admin_account") {
      return handleError(null, "Please login first to get details");
    }
    const { pageno, searchText, statusFilter, startDate, endDate } = await request.json();
    const page = pageno ? pageno : 1;
    const limit = 20;
    const start_index = (page - 1) * limit;
    await dbConnect();
    let query = {};
    if (statusFilter && statusFilter !== "all") {
      query.order_status = statusFilter;
    }
    if (startDate || endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.invoice_date = { $gte: start, $lte: end };
    }

    let pipeline = [
      {
        $addFields: {
          customerId: { $toObjectId: "$customer" }, 
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerData",
        },
      },
      {
        $addFields: {
          customer: { $arrayElemAt: ["$customerData", 0] },
        },
      },
      { $project: { customerData: 0, customerId: 0 } },
      { $match: query },
    ];
    if (searchText) {
      pipeline.push({
        $match: {
          $or: [
            { order_number: { $regex: searchText, $options: "i" } },
            { "items.name": { $regex: searchText, $options: "i" } },
            { "customer.customer_name": { $regex: searchText, $options: "i" } },
            { "customer.email": { $regex: searchText, $options: "i" } },
          ],
        },
      });
    }
    pipeline.push(
      { $sort: { invoice_date: -1 } },
      { $skip: start_index },
      { $limit: limit }
    );

    const [ordersData, totalCount, statsResult] = await Promise.all([
      OrdersModel.aggregate(pipeline),
      OrdersModel.countDocuments(query),
      OrdersModel.aggregate([
        {
          $facet: {
            totalOrders: [{ $count: "count" }],
            confirmedOrders: [
              { $match: { order_status: "confirmed" } },
              { $count: "count" },
            ],
            cancelledOrders: [
              { $match: { order_status: "cancelled" } },
              { $count: "count" },
            ],
            totalRevenue: [
              { $group: { _id: null, total: { $sum: "$total_incl_vat" } } },
            ],
            avgOrderValue: [
              { $group: { _id: null, avg: { $avg: "$total_incl_vat" } } },
            ],
          },
        },
      ]),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page * limit < totalCount;

    const orders = {
      success: true,
      data: ordersData,
      hasMore,
      totalPages,
      totalCount,
      stats: {
        total: statsResult[0]?.totalOrders[0]?.count || 0,
        confirmed: statsResult[0]?.confirmedOrders[0]?.count || 0,
        cancelled: statsResult[0]?.cancelledOrders[0]?.count || 0,
        totalRevenue: statsResult[0]?.totalRevenue[0]?.total || 0,
        avgOrderValue: statsResult[0]?.avgOrderValue[0]?.avg || 0,
      },
    };
    return NextResponse.json(orders);
  } catch (error) {
    return handleError(error);
  }
}
