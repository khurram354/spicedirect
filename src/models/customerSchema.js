import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    email: {type:String, required:true, trim:true, unique:true},
    password: {type:String, trim:true, select:false},
    active: {type: Boolean, trim: true,},
    customer_name: {type:String, trim:true},
    mobile: {type:Number, trim: true},
    city: {type:String, trim: true},
    status: {type: Boolean, default: false},
    order_taking_days:{type: [Number], required: true, default: [], enum: [0, 1, 2, 3, 4, 5, 6], index: true},
},{
    collection: 'customers',
    versionKey:false,
});
const CustomerModel = mongoose.models.customers || mongoose.model("customers", customerSchema)
export default CustomerModel;