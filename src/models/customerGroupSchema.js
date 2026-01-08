import mongoose from "mongoose";
import CustomerModel from "./customerSchema";

const customerGroupItemSchema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId, required:true},
    name:{type:String, required:true, trim:true, unique:true },
    customers: [{type:mongoose.Schema.Types.ObjectId, ref: 'customers', index:true }],
    items: [{
        _id: { type: mongoose.Schema.Types.ObjectId },
        rate:{type:Number}}]
},
    {
        collection:"customerGroupItems",
        versionKey:false,
    }
);
const CustomerGroupItemModel = mongoose.models.customerGroupItems || mongoose.model("customerGroupItems", customerGroupItemSchema)
export default CustomerGroupItemModel