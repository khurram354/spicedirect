import dbConnect from "@/lib/db";
import CustomerGroupItemModel from "@/models/customerGroupSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";
import { verifyBearerToken } from "@/utils/ermauthmiddleware";

export async function POST(request) {
    try {
        verifyBearerToken(request);
        const { _id, customers = [], name, items = [] } = await request.json();
        if (!_id || !name) { return handleError(null, "missing required fields") }
        await dbConnect();
        const docId = new mongoose.Types.ObjectId(_id);
        const sanitizedCustomers = customers.map(custId => new mongoose.Types.ObjectId(custId));
        const senitizedItems = items.map(item => ({
            _id: new mongoose.Types.ObjectId(item._id),
            rate: item.rate
        }));
        const payload = {
            _id: docId,
            name,
            customers: sanitizedCustomers,
            items: senitizedItems
        }
        const checkDoc = await CustomerGroupItemModel.findById(docId);
        if (checkDoc) {
            checkDoc.name = name;
            checkDoc.customers = sanitizedCustomers;
            checkDoc.items = senitizedItems;

            await checkDoc.save();
            return handleSuccess(null, "customerGroupItem", "customerGroupItem updated successfully")
        } else {
            const resp = await CustomerGroupItemModel.create(payload);
            return handleSuccess(null, "customerGroupItem", "customer Group items added successfully")
        }
    } catch (error) { return handleError(error) }
}