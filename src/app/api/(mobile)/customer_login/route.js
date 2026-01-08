import dbConnect from "@/lib/db";
import CustomerModel from "@/models/customerSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) { return handleError(null, "Please provide all fields") };
        await dbConnect();
        const customer = await CustomerModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).select("+password");
        if (!customer) { return handleError(null, "Invalid email or password") }
        if(!customer.active){return handleError(null, 'customer account closed')}
        const matchPassword = await bcrypt.compare(password, customer.password);
        if (!matchPassword) { return handleError(null, "Invalid email or password") };
        const tokenData = { id: customer._id, email: customer.email };
        const plainCustomer = customer.toObject();
        const deliverydays = plainCustomer.zones.map((zone,index)=>zone!=null?index:null).filter(index=>index!=null);
        const userId = customer._id;
        const LoginToken = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '30d' });
        const delivery_days = customer.delivery_days || [];
        const customerEmail = customer.email || '';
        const customerName = customer.customer_name || '';
        return handleSuccess({LoginToken, deliverydays, userId, delivery_days, customerEmail, customerName}, "token", "login successfully");
    } catch (error) {
        return handleError(null, "network error");
    }
}