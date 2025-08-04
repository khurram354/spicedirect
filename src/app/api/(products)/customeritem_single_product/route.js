import dbConnect from "@/lib/db";
import CustomerItemModel from "@/models/customerItemsSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        const { _id, customer, items } = await request.json();
        if (!_id || !customer || !items) { return handleError(null, "missing required fields") }
        await dbConnect();
        const docId = new mongoose.Types.ObjectId(_id);
        const customerId = new mongoose.Types.ObjectId(customer);
        const senitizedItems = items.map(item => ({
            _id: new mongoose.Types.ObjectId(item._id),
            rate: item.rate
        }));
        const senitizedData = {
            _id: docId,
            customer: customerId,
            items: senitizedItems
        }
        const checkDoc = await CustomerItemModel.findById(_id);
        if (checkDoc) {
            checkDoc.items = senitizedItems;
            await checkDoc.save();
            return handleSuccess(null, "customerItem", "customerItem updated successfully")
        } else {
            const resp = await CustomerItemModel.create(senitizedData);
            if (resp) {
                return handleSuccess(null, "customerItem", "customer specific item added successfully")
            } else {
                console.log("product not found to update");
                return handleSuccess(null, "customerItem", "no customer specific prices to add")
            }
        }
    } catch (error) { return handleError(error) }
}