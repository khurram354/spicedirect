// import dbConnect from "@/lib/db";
// import InventoryProduct from "@/models/inventorySchema";
// import InventoryCategory from "@/models/categorySchema";
// import { NextResponse } from "next/server";
// import { handleError } from "@/utils/errorHandler";
// import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
// import CustomerItemModel from "@/models/customerItemsSchema";


// const setCustomerSpecificPrices = async (customerId, resultData) => {
//     const customerSpecificProducts = await CustomerItemModel.find({ customer: customerId });
//     const customerItemsMap = {};
//     if (customerSpecificProducts.length > 0) {
//         for (const item of customerSpecificProducts[0].items) {
//             customerItemsMap[item._id.toString()] = item.rate
//         }
//     };
//     const updateProductPriceData = resultData.map((product) => {
//         const customRate = customerItemsMap[product._id.toString()];
//         if (customRate !== undefined) {
//             return {
//                 ...product.toObject(),
//                 default_sale_price: customRate
//             }
//         }
//         return null;
//     }).filter((product) => product !== null);
//     return updateProductPriceData;
// }

// export async function POST(request) {
//     try {
//         const { pageno } = await request.json();
//         const page = pageno ? pageno : 1;
//         const limit = 40;
//         const start_index = (page - 1) * limit;
//         const end_index = start_index + limit;
//         const customerId = await getMobileCustomerId(request);
//         await dbConnect();
//         const resultData = await InventoryProduct.find().populate('category').populate('vat');
//         const resp = await setCustomerSpecificPrices(customerId, resultData);
//         const totalPages = Math.ceil(resp.length / 40);
//         const productData = resp.slice(start_index, end_index);
//         const hasMore = end_index < resp.length;
//         return NextResponse.json({
//             success: true,
//             data: productData,
//             hasMore: hasMore,
//             totalPages: totalPages,
//         });

//     } catch (error) { handleError(error) }
// }






import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { NextResponse } from "next/server";
import { handleError } from "@/utils/errorHandler";
import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import CustomerItemModel from "@/models/customerItemsSchema";
import AppCustFavProModel from "@/models/appCusFavProSchema";

export async function POST(request) {
  try {
    await dbConnect();
    const { pageno = 1 } = await request.json();
    const limit = 500;
    const start_index = (pageno - 1) * limit;
    const end_index = start_index + limit;
    const customerId = await getMobileCustomerId(request);
    if (!customerId) {return handleError(null, "customer does not exist");}
    const customerSpecific = await CustomerItemModel.findOne({ customer: customerId });
    const priceMap = {};
    const specificIds = [];
    if (customerSpecific?.items?.length) {
      for (const item of customerSpecific.items) {
        const pid = item._id.toString();
        priceMap[pid] = item.rate;
        specificIds.push(pid);
      }
    }
    const favData = await AppCustFavProModel.findOne({ customerId });
    const favIds = favData?.favProducts?.map((p) => p.productId.toString()) || [];
    const mergedProductIds = [...new Set([...specificIds, ...favIds])];

    if (mergedProductIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        hasMore: false,
        totalPages: 0,
      });
    }
    const products = await InventoryProduct.find({
      _id: { $in: mergedProductIds },
      active: true,
    })
      .populate("category")
      .populate("subcategory")
      .populate("subsubcategory")
      .populate("vat")
      .lean();
    const finalProducts = products.map((product) => ({
      ...product,
      default_sale_price: priceMap[product._id.toString()] ?? product.default_sale_price,
    }));
    const totalPages = Math.ceil(finalProducts.length / limit);
    const paginatedData = finalProducts.slice(start_index, end_index);
    const hasMore = end_index < finalProducts.length;

    return NextResponse.json({
      success: true,
      data: paginatedData,
      hasMore,
      totalPages,
    });
  } catch (error) {
    return handleError(error);
  }
}
