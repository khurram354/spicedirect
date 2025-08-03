import dbConnect from "@/lib/db";
import CustomerModel from "@/models/customerSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        let customerInput = await request.json(request.body);
        let { _id } = customerInput;
        if (!mongoose.Types.ObjectId.isValid(_id)) { return handleError(null, "invalid custome Id") }
        await dbConnect();
        const customerExist = await CustomerModel.findById(_id)
        if (customerExist) {
            await CustomerModel.findByIdAndUpdate(_id, customerInput, { new: true })
        } else {
            const id = new mongoose.Types.ObjectId(_id);
            customerInput._id = id;
            const resp = await CustomerModel.create(customerInput);
        }
        return handleSuccess(null, "customer", "Customer Added successfully")
    } catch (error) { return handleError(error) }
}